const ctaOpenDatabaseLink = document.querySelector("#openDatabaseLink");
ctaOpenDatabaseLink.onclick = () => {
    window.electronAPI.openDatabaseSelectDialogue()
};