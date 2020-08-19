var dragged = (isGrabbed = zInd = z_base = 0),
	doc = document,
	w = a => window.getComputedStyle(a);
(Items = [
	...(List = doc.querySelector('.list')).getElementsByClassName('item'),
]).forEach(item => {
	item.transEnded = 1;
	item.ontransitionend = e => {
		item.style.removeProperty((item.transEnded = 'top'));
		item.classList.remove('bnDragged', 'moving');
		if (item.bnDragged) {
			zInd -= zInd > z_base;
			item.bnDragged = Items.forEach(
				a => (a.style.zIndex = w(a).zIndex - (w(a).zIndex > z_base))
			);
		}
	};
	item.onmousedown = e => {
		isGrabbed = item.transEnded && e.which < 2;
		if (isGrabbed) {
			(dragged = item).isDraggin = item.classList.add((ctxMenu = 'mseDn'));
			item_Top = 0;
			item_Y = item.offsetTop;
			mse_Start_X = e.pageX;
			mse_Start_Y = e.pageY;
		}
	};
});
doc.onmousemove = e => {
	if (isGrabbed) {
		if (!dragged.isDraggin) {
			(ds = dragged.style).zIndex = ++zInd;
			dragged.transEnded = dragged.classList.remove(
				(dragged.isDraggin = 'animated')
			);
		}
		[0, 2].forEach((k, i) => {
			if (
				(a = (c = [
					dragged.previousElementSibling,
					dragged,
					dragged.nextElementSibling,
				])[k]) &&
				a.transEnded &&
				c[i].offsetTop + c[i++]	.offsetHeight / 2 >
				c[i].offsetTop + c[i]	.offsetHeight / 2
			) {
				a.classList.add('moving');
				a.style.top = `${a.offsetTop - item_Y}px`;
				List.insertBefore(c[i], c[--i]);
				item_Top -= (a.offsetHeight + parseFloat(w(a).marginBottom)) * --k;
				a.transEnded = a.style.top = 0;
				item_Y = a.offsetTop;
			}
		});
		ds.left = e.pageX - mse_Start_X				+ 'px';
		ds.top	= e.pageY - mse_Start_Y + item_Top	+ 'px';
	}
};
doc.onmouseup = e =>
	dragged &&
	setTimeout(e => {
		if (ctxMenu) ds.top = 0;
		if (dragged.isDraggin)
			dragged.classList.add((dragged.bnDragged = 'bnDragged'), 'animated');
		dragged.classList.remove('mseDn');
		dragged = ds.left = isGrabbed = 0;
	}, 10);
doc.oncontextmenu = e => (ctxMenu = e.preventDefault());
