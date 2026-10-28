const keys = document.getElementsByClassName('keys');
const highlightBgEl = document.getElementById("highlight-background");
const highlightEl = document.getElementById("highlight");
const highlightExitEl = document.getElementById("highlight-exit");
let NumLockState, CapsLockState, ScrollLockState;
let shadow = `0 0 20px 0px lime`, noshadow = "none";
let highlightMode = 0;
let clickable = false;

window.onload = transition();


window.addEventListener('keydown', (event) => {
    event.preventDefault();
	if (!clickable) return;
    if (highlightMode === 0) removeHighlight();
	else if (highlightMode === 1) removeHighlight();
    if (highlightMode > 1) color(event.code, 1);
    getModifiers();
    updateModifiers();
});
window.addEventListener('keyup', (event) => {
    if (highlightMode > 1) color(event.code, 2);
});
window.addEventListener('mousedown', (event) => {
	if (!clickable) return;
    if (highlightMode === 0) removeHighlight();
	else if (highlightMode === 1) removeHighlight();
	if (highlightMode > 1) {
		if (event.target.id === "reset") return;
        if (event.target.id === "fullscreen") return;
        if (event.target.id === "TOS") return;
		if (event.button === 0) {
			color('leftClick', 1);
		}
		else if (event.button === 1) {
			color('middleClick', 1);
		}
		else if (event.button === 2) {
			color('rightClick', 1);
		}
	}
    getModifiers();
    updateModifiers();
});
window.addEventListener('mouseup', (event) => {
	if (highlightMode > 1) {
		if (event.target.id === "reset") return;
        if (event.target.id === "fullscreen") return;
        if (event.target.id === "TOS") return;
		if (event.button === 0) {
			color('leftClick', 2);
		}
		else if (event.button === 1) {
			color('middleClick', 2);
		}
		else if (event.button === 2) {
			color('rightClick', 2);
		}
	}
    getModifiers();
    updateModifiers();
});
window.addEventListener('contextmenu', (event) => {
    if (event.target.id != "TOS") event.preventDefault();
});
window.addEventListener("pointerover", (event) => {
    getModifiers();
    updateModifiers();
});

function color(id, mode) {
    if (document.getElementById('highlight-background')) return;
    if (!document.getElementById(id)) return;
    if (mode === 1) {
        document.getElementById(id).style.backgroundColor = 'white';
        document.getElementById(id).style.color = 'black';
        document.getElementById(id).style.borderColor = 'gray';
    }
    else if (mode === 2) {
        document.getElementById(id).style.backgroundColor = 'lime';
        document.getElementById(id).style.color = 'white';
        document.getElementById(id).style.borderColor = 'white';
        if (document.getElementById(id).className === "indicators") document.getElementById(id).style.boxShadow = shadow;
    }
    else if (mode === 3) {
        document.getElementById(id).style.backgroundColor = 'black';
        document.getElementById(id).style.color = 'white';
        document.getElementById(id).style.borderColor = 'white';
        document.getElementById(id).style.boxShadow = noshadow;
    }
}

function reset() {
    for (i=0;i<keys.length;i++) {
        keys[i].style.backgroundColor = 'black';
        keys[i].style.color = 'white';
        keys[i].style.borderColor = 'white';
    }
}

function getModifiers() {
    NumLockState = event.getModifierState("NumLock");
    CapsLockState = event.getModifierState("CapsLock");
    ScrollLockState = event.getModifierState("ScrollLock");
}

function updateModifiers() {
    NumLockState ? color("NumLockIndicator", 2) : color("NumLockIndicator", 3);
    CapsLockState ? color("CapsLockIndicator", 2) : color("CapsLockIndicator", 3);
    ScrollLockState ? color("ScrollLockIndicator", 2) : color("ScrollLockIndicator", 3);
}

function fullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
    document.getElementById('fullscreen').blur()
}

function removeHighlight() {
	if (highlightMode === 0) {
		highlightMode = 1;
		highlightBgEl.remove();
		highlightEl.remove();
	}
	else if (highlightMode === 1) highlightMode = 2;
}

function transition() {
	highlightBgEl.style.width = screen.width+"px";
	highlightBgEl.style.height = screen.height+"px";
	highlightBgEl.style.opacity = 80+"%";
	highlightEl.style.opacity = 100+"%";
	setTimeout(() => {
		highlightExitEl.style.opacity = 100+"%";
	}, 2000);
	setTimeout(() => {
		clickable = true;
	}, 2500);
}