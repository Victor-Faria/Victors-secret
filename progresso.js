const $progressBar = $('.progress');
const $progressContainer = $('.progress-container');

let progress = 0;

function updateProgress() {
    $progressBar.css('width', progress + '%');

    if (progress === 100) {
        $progressBar.text("Pedido Concluido");
    } else if (progress === 90) {
        $progressBar.text("Pedido em Rota");
    } else if (progress === 60) {
        $progressBar.text("Pedido Enviado");
    } else if (progress === 30) {
        $progressBar.text("Preparando Pedido");
    } else {
        $progressBar.text("");
    }
}

function advanceProgress() {
    if (progress === 0) {
        progress = 30;
    } else if (progress === 30) {
        progress = 60;
    } else if (progress === 60) {
        progress = 90;
    } else if (progress === 90) {
        progress = 100;
    } else {
        progress = 100;
    }
    updateProgress();
}

let progressInterval;
$('.finalize-purchase').on('click', function() {
    $progressContainer.show();
    if (!progressInterval) {
        progressInterval = setInterval(advanceProgress, 1200);
    }
});

updateProgress();
