const px = 'px',
	an = 'animated',
	bD = 'bnDragged',
	mv = 'moving',
	mD = 'mseDn',
	minDur = 0.1,
	maxDur = 5,
	doc = document,
	transDur = doc.getElementById('trans-dur');
var dragged,
	isGrabbed = (zInd = z_base = 0),
	gCS = a => window.getComputedStyle(a),
	setTransDur = () =>
		(Object.values(doc.styleSheets[0].cssRules).find(
			a => a.selectorText === '.' + an
		).style.transitionDuration = doc.getElementById(
			'disp_trans-dur'
		).innerText = `${(tmOut = transDur.value)}s`);
transDur.max = doc.getElementById('max-dur').innerText = maxDur;
transDur.min = transDur.step = doc.getElementById('min-dur').innerText = minDur;
transDur.value = maxDur / 4;
setTransDur();
(Items = [
	...(List = doc.getElementById('list')).getElementsByClassName('item'),
]).forEach(item => {
	item.transEnded = 1;
	item.ontransitionend = () => {
		item.style.removeProperty((item.transEnded = 'top'));
		item.classList.remove(bD, mv);
		if (item.bnDragged) {
			zInd -= zInd > z_base;
			item.bnDragged = Items.forEach(
				a => (a.style.zIndex = gCS(a).zIndex - (gCS(a).zIndex > z_base))
			);
		}
	};
	item.onmousedown = e => {
		isGrabbed = item.transEnded && e.which < 2;
		if (isGrabbed) {
			bnDragged = (dragged = item).isDraggin = (dc = item.classList).add(mD);
			ds = dragged.style;
			mse_Start_X = e.pageX;
			mse_Start_Y = e.pageY;
		}
	};
});
doc.onmousemove = e =>
	isGrabbed &&
	(bnDragged ?
		([0, 2].forEach(
			(k, i) =>
				(a = (c = [
					dragged.previousElementSibling,
					dragged,
					dragged.nextElementSibling,
				])[k--]) &&
				a.transEnded &&
				c[i].offsetTop + (c[i++].offsetHeight - c[i].offsetHeight) / 2 >
				c[i].offsetTop &&
				((oHmT = a => (a.offsetHeight + parseFloat(gCS(a).marginTop)) * k),
					List.insertBefore(c[i], c[--i]),
					(a.style.top = oHmT(dragged) + px),
					(a.transEnded = a.classList.add(mv)),
					(mse_Start_Y += oHmT(a)),
					(a.style.top = 0))
		),
			(ds.left = e.pageX - mse_Start_X + px),
			(ds.top = e.pageY - mse_Start_Y + px)) :
		(ds.zIndex = zInd += bnDragged =
			dc.remove(an) ||
			Math.abs(e.pageX - mse_Start_X) + Math.abs(e.pageY - mse_Start_Y) > 2));
doc.onmouseup = () =>
	dragged &&
	setTimeout(() => {
		if (bnDragged)
			ds.top = dragged.transEnded = dc.add((dragged.bnDragged = bD), an) || 0;
		ds.left = isGrabbed = dragged = dc.remove(mD) || 0;
	}, 10);
doc.oncontextmenu = e => e.preventDefault();
