/*
 * Script para creación del icono del chatbot en Canvas LMS
 * Autor: rjmasache@utpl.edu.ec
 * Fecha: 2024-10-23
 */

// Variable global para controlar el estado del chatbot
let isChatbotOpen = false;

// SVGs para icono cerrado e icono abierto
const closedChatbotSVG = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
        width="25"
        height="25"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12C14.2005 12.6224 13.1502 13 12 13C10.8498 13 9.79952 12.6224 9 12M9 8.01953V8M15 8.01953V8M3 20.7929V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H8.41421C8.149 17 7.89464 17.1054 7.70711 17.2929L3.85355 21.1464C3.53857 21.4614 3 21.2383 3 20.7929Z"
        />
    </svg>
`;

const openChatbotSVG = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
        width="25"
        height="25"
    >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
`;

// Crear el icono del chatbot
function createChatbotIcon() {
    const chatbotIcon = document.createElement("div");
    chatbotIcon.id = "chatbot-canvas-icon";
    chatbotIcon.title = "Abrir Chatbot";

    // Establecer el SVG inicial (cerrado)
    chatbotIcon.innerHTML = closedChatbotSVG;
    document.body.appendChild(chatbotIcon);

    return chatbotIcon;
}

// Crear el contenedor del chatbot y el iframe
function createChatbotContainer() {
    const chatbotContainer = document.createElement("div");
    chatbotContainer.id = "chatbot-canvas-container";

    const chatbotIframe = document.createElement("iframe");
    chatbotIframe.id = "chatbot-canvas-iframe";
    chatbotIframe.src = "http://localhost:3000/";

    chatbotContainer.appendChild(chatbotIframe);
    document.body.appendChild(chatbotContainer);

    return chatbotContainer;
}

// Actualizar el SVG del icono
function updateChatbotIcon(isOpen, chatbotIcon) {
    chatbotIcon.innerHTML = isOpen ? openChatbotSVG : closedChatbotSVG;
}

// Mostrar/ocultar el chatbot y actualizar el icono SVG
function showChatbot(chatbotContainer) {
    chatbotContainer.style.display = "block";
    isChatbotOpen = true;
}

function hideChatbot(chatbotContainer) {
    chatbotContainer.style.display = "none";
    isChatbotOpen = false;
}

function toggleChatbot(chatbotContainer, chatbotIcon) {
    if (isChatbotOpen) {
        hideChatbot(chatbotContainer);
        updateChatbotIcon(false, chatbotIcon);
    } else {
        showChatbot(chatbotContainer);
        updateChatbotIcon(true, chatbotIcon);
    }
}

// Manejar los eventos de clic
function handleChatbotEvents(chatbotIcon, chatbotContainer) {
    // Mostrar/ocultar el iframe cuando se haga clic en el icono
    chatbotIcon.addEventListener("click", event => {
        event.stopPropagation();

        toggleChatbot(chatbotContainer, chatbotIcon);
    });

    // Cerrar el chatbot cuando se haga clic fuera del contenedor o del icono
    document.addEventListener("click", event => {
        if (
            isChatbotOpen &&
            !chatbotContainer.contains(event.target) &&
            !chatbotIcon.contains(event.target)
        ) {
            hideChatbot(chatbotContainer);
            updateChatbotIcon(false, chatbotIcon);
        }
    });
}

// Inicializar el chatbot
function initializeChatbot() {
    const chatbotIcon = createChatbotIcon();
    const chatbotContainer = createChatbotContainer();

    handleChatbotEvents(chatbotIcon, chatbotContainer);
}

initializeChatbot();
