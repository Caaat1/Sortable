const px = 'px',
	a = 'animated',
	b = 'bnDragged',
	m = 'moving',
	md = 'mseDn',
	minDur = 0.1,
	maxDur = 5,
	doc = document,
	transDur = doc.getElementById('trans-dur');
var ds, isGrabbed = (zInd = z_base = 0),
	gCS = x => window.getComputedStyle(x),
	setTransDur = () =>
		(Object.values(doc.styleSheets[0].cssRules).find(
			x => x.selectorText === '.' + a
		).style.transitionDuration = doc.getElementById(
			'disp_trans-dur'
		).innerText = `${(tmOut = transDur.value)}s`);
transDur.max = doc.getElementById('max-dur').innerText = maxDur;
transDur.min = transDur.step = doc.getElementById('min-dur').innerText = minDur;
transDur.value = maxDur / 4;
setTransDur();
(Items = [
	...(List = doc.getElementById('list')).getElementsByClassName('item')
]).forEach(item => {
	item.transEnded = 1;
	item.ontransitionend = () => {
		item.style.removeProperty(item.transEnded = 'top');
		item.classList.remove(b, m);
		if (item.bnDragged) {
			zInd -= zInd > z_base;
			item.bnDragged = Items.forEach(
				x => x.style.zIndex = gCS(x).zIndex - (gCS(x).zIndex > z_base)
			);
		}
	};
	item.onmousedown = e => {
		isGrabbed = (dt = item.transEnded) && e.which < 2;
		if (isGrabbed) {
			dd = (dragged = item).isDraggin = (dc = item.classList).add((mnuOff = md));
			dragged.top = 0;
			mse_Start_X = e.pageX;
			mse_Start_Y = e.pageY;
		}
	};
});
doc.onmousemove = e => {
	if (isGrabbed) {
		if (!dd) {
			(ds = dragged.style).zIndex = ++zInd;
			dt = dc.remove((dd = a));
		}
		[0, 2].forEach((k, i) => {
			if (
				(x = (
					c = [
						dragged.previousElementSibling,
						dragged,
						dragged.nextElementSibling
					]
				)[k--]) && x.transEnded &&
				c[i].offsetTop + (c[i++].offsetHeight - c[i].offsetHeight) / 2 > c[i].offsetTop
			) {
				oHmT = x => (x.offsetHeight + parseFloat(gCS(x).marginTop)) * k;
				List.insertBefore(c[i], c[--i]);
				x.style.top = oHmT(dragged) + px;
				x.classList.add(m);
				dragged.top -= oHmT(x);
				x.style.top = x.transEnded = 0;
			}
		});
		ds.left = e.pageX - mse_Start_X + px;
		ds.top	= e.pageY - mse_Start_Y + dragged.top + px;
	}
};
doc.onmouseup = () =>
	dragged &&
	setTimeout(() => {
		if (mnuOff) ds.top = 0;
		if (dd) dc.add((dragged.bnDragged = b), a);
		dc.remove(md);
		dragged = ds.left = isGrabbed = 0;
	}, 10);
doc.oncontextmenu = e => mnuOff = e.preventDefault();
