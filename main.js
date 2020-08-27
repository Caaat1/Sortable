const px = "px",
	a = "animated",
	b = "bnDragged",
	m = "moving",
	md = "mseDn",
	minDur = 0.1,
	maxDur = 5,
	doc = document,
	transDur = doc.getElementById("trans-dur");
var dragged = (isGrabbed = zInd = z_base = 0),
	w = (x) => window.getComputedStyle(x),
	setTransDur = () =>
		(Object.values(doc.styleSheets[0].cssRules).find(
			(x) => x.selectorText === "." + a
		).style.transitionDuration = document.getElementById(
			"disp_trans-dur"
		).innerText = `${(tmOut = transDur.value)}s`);
transDur.max = maxDur;
transDur.min = minDur;
transDur.step = minDur;
transDur.value = (maxDur - minDur) / 4;
doc.getElementById("min-dur").innerText = minDur;
doc.getElementById("max-dur").innerText = maxDur;
setTransDur();
(Items = [
	...(List = doc.querySelector("#list")).getElementsByClassName("item")
]).forEach((item) => {
	item.transEnded = 1;
	item.ontransitionend = () => {
		item.style.removeProperty((item.transEnded = "top"));
		item.classList.remove(b, m);
		if (item.bnDragged) {
			zInd -= zInd > z_base;
			item.bnDragged = Items.forEach(
				(x) => (x.style.zIndex = w(x).zIndex - (w(x).zIndex > z_base))
			);
		}
	};
	item.onmousedown = (e) => {
		isGrabbed = item.transEnded && e.which < 2;
		if (isGrabbed) {
			(dragged = item).isDraggin = item.classList.add((mnuOff = md));
			item_Top = 0;
			item_Y = item.offsetTop;
			mse_Start_X = e.pageX;
			mse_Start_Y = e.pageY;
		}
	};
});
doc.onmousemove = (e) => {
	if (isGrabbed) {
		if (!dragged.isDraggin) {
			(ds = dragged.style).zIndex = ++zInd;
			dragged.transEnded = dragged.classList.remove((dragged.isDraggin = a));
		}
		[0, 2].forEach((k, i) => {
			if (
				(x = (c = [
					dragged.previousElementSibling,
					dragged,
					dragged.nextElementSibling
				])[k]) &&
				c[i].offsetTop + c[i++].offsetHeight / 2 >
				c[i].offsetTop + c[i].offsetHeight / 2 &&
				x.transEnded
			) {
				x.classList.add(m);
				x.style.top = x.offsetTop - item_Y + px;
				List.insertBefore(c[i], c[--i]);
				item_Top -= (x.offsetHeight + parseFloat(w(x).marginBottom)) * --k;
				x.transEnded = x.style.top = 0;
				item_Y = x.offsetTop;
			}
		});
		ds.left = e.pageX - mse_Start_X + px;
		ds.top = e.pageY - mse_Start_Y + item_Top + px;
	}
};
doc.onmouseup = (e) =>
	dragged &&
	setTimeout((e) => {
		if (mnuOff) ds.top = 0;
		if (dragged.isDraggin) dragged.classList.add((dragged.bnDragged = b), a);
		dragged.classList.remove(md);
		dragged = ds.left = isGrabbed = 0;
	}, 10);
doc.oncontextmenu = (e) => (mnuOff = e.preventDefault());
