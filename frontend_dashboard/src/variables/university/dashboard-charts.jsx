// ##############################
// // // general variables for charts
// #############################
const primaryColor = "#26a69a";
const accentColor = "#ff8a65";
const purpleColor = "#7f8ff4";

// --- Opsi Skala Tersembunyi (Untuk playlistCharts) ---
const hiddenScaleOptions = {
    maintainAspectRatio: false,
    responsive: 1,
    layout: {
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            bodySpacing: 4,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            xPadding: 10,
            yPadding: 10,
            caretPadding: 10,
        },
    },
    scales: {
        y: {
            display: false,
            ticks: {
                display: false,
            },
            grid: {
                color: "rgba(0, 0, 0, 0.01)",
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false,
            },
        },
        x: {
            categoryPercentage: 0.6,
            barPercentage: 0.5,
            maxBarThickness: 8,
            display: false,
            ticks: {
                display: false,
            },
            grid: {
                color: "rgba(0, 0, 0, 0.01)",
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false,
            },
        },
    },
};

// --- Opsi Skala Tampil (Untuk dashboardAllProductsChart2 & 3) ---
const visibleScaleOptions = {
    maintainAspectRatio: false,
    responsive: 1,
    layout: {
        padding: { left: 0, right: 0, top: 0, bottom: 0 }
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            bodySpacing: 4,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            xPadding: 10,
            yPadding: 10,
            caretPadding: 10
        }
    },
    scales: {
        x: {
            display: true,
            grid: {
                color: "rgba(0, 0, 0, 0.01)",
            },
            ticks: {
                display: true
            },
        },
        y: {
            categoryPercentage: 0.8,
            barPercentage: 0.6,
            maxBarThickness: 12,
            display: true,
            grid: {
                color: "rgba(0, 0, 0, 0.01)",
            },
            ticks: {
                display: true
            }
        }
    }
}


// ##############################
// // // Dashboard view - Playlist Charts 1-10
// #############################

// --- PERBAIKAN DI BAWAH INI ---
// Mengubah 'data' dari fungsi menjadi objek
// Mengganti 'gradientFill' dengan 'accentColor'

export const playlistCharts = {
    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Progress",
                backgroundColor: accentColor, // <-- Diubah
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [50, 39, 66, 76, 23, 55, 80, 45, 68, 80, 43, 55],
            },
        ],
    },
    options: hiddenScaleOptions
};

export const playlistCharts1 = {
    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Progress",
                backgroundColor: accentColor, // <-- Diubah
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [50, 39, 166, 76, 23, 55, 180, 45, 68, 80, 143, 55],
            },
        ],
    },
    options: hiddenScaleOptions
};

export const playlistCharts2 = {
    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Progress",
                backgroundColor: accentColor, // <-- Diubah
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [50, 239, 66, 276, 23, 55, 280, 245, 68, 80, 243, 55],
            },
        ],
    },
    options: hiddenScaleOptions
};

export const playlistCharts3 = {
    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Progress",
                backgroundColor: accentColor, // <-- Diubah
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [50, 139, 66, 176, 123, 255, 80, 45, 68, 280, 43, 155],
            },
        ],
    },
    options: hiddenScaleOptions
};

export const playlistCharts5 = {
    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Progress",
                backgroundColor: accentColor, // <-- Diubah
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [50, 39, 66, 76, 23, 55, 80, 45, 68, 80, 43, 55],
            },
        ],
    },
    options: hiddenScaleOptions
};

export const playlistCharts6 = {
    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Progress",
                backgroundColor: accentColor, // <-- Diubah
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [50, 39, 66, 176, 23, 155, 80, 45, 68, 180, 43, 155],
            },
        ],
    },
    options: hiddenScaleOptions
};

export const playlistCharts7 = {
    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Progress",
                backgroundColor: accentColor, // <-- Diubah
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [150, 39, 166, 76, 23, 55, 180, 45, 168, 80, 43, 55],
            },
        ],
    },
    options: hiddenScaleOptions
};

export const playlistCharts8 = {
    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Progress",
                backgroundColor: accentColor, // <-- Diubah
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [50, 139, 66, 176, 23, 55, 80, 45, 168, 80, 143, 155],
            },
        ],
    },
    options: hiddenScaleOptions
};

export const playlistCharts9 = {
    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Progress",
                backgroundColor: accentColor, // <-- Diubah
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [250, 39, 66, 176, 23, 55, 80, 45, 68, 80, 43, 55],
            },
        ],
    },
    options: hiddenScaleOptions
};

export const playlistCharts10 = {
    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Progress",
                backgroundColor: accentColor, // <-- Diubah
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [50, 39, 66, 76, 223, 55, 80, 245, 68, 80, 43, 55],
            },
        ],
    },
    options: hiddenScaleOptions
};


// ##############################
// // // Dashboard view - All Products - Chart 0 & 1
// #############################

export const dashboardAllProductsChart = {
    data: {
        labels: ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
        datasets: [
            {
                label: "Stats",
                borderColor: primaryColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: primaryColor,
                pointBorderWidth: 2,
                pointHoverRadius: 0,
                pointHoverBorderWidth: 0,
                pointRadius: 3,
                fill: true,
                backgroundColor: "rgba(38, 166, 154, 0.2)", // <-- Diubah
                borderWidth: 2,
                data: [40, 500, 650, 700, 1200, 1250, 1300, 1900],
            },
        ],
    },
    options: hiddenScaleOptions
};

export const dashboardAllProductsChart1 = {
    data: {
        labels: ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
        datasets: [
            {
                label: "Stats",
                borderColor: primaryColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: primaryColor,
                pointBorderWidth: 0,
                pointHoverRadius: 0,
                pointHoverBorderWidth: 0,
                pointRadius: 0,
                fill: true,
                backgroundColor: "rgba(38, 166, 154, 0.2)", // <-- Diubah
                borderWidth: 2,
                data: [40, 500, 650, 700, 1200, 1250, 1300, 1900],
            },
        ],
    },
    options: hiddenScaleOptions
};


// ##############################
// // // Dashboard view - All Products - Chart 2 & 3
// #############################

export const dashboardAllProductsChart2 = {
    data: {
        labels: ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
        datasets: [
            {
                label: "Online Today",
                lineTension: 0.1,
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                fill: true,
                backgroundColor: "rgba(255, 138, 101, 0.2)", // <-- Diubah
                borderWidth: 2,
                data: [640, 660, 400, 720, 490, 832, 660, 520],
            },
        ],
    },
    options: visibleScaleOptions
};

export const dashboardAllProductsChart3 = {
    data: {
        labels: ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
        datasets: [
            {
                label: "Posts",
                lineTension: 0.1,
                borderColor: primaryColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: primaryColor,
                pointBorderWidth: 2,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                fill: true,
                backgroundColor: "rgba(38, 166, 154, 0.2)", // <-- Diubah
                borderWidth: 2,
                data: [640, 860, 700, 720, 790, 832, 460, 920],
            },
            {
                label: "Shares",
                lineTension: 0.1,
                borderColor: accentColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: accentColor,
                pointBorderWidth: 2,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                fill: true,
                backgroundColor: "rgba(255, 138, 101, 0.2)", // <-- Diubah
                borderWidth: 2,
                data: [540, 760, 400, 620, 690, 432, 660, 720],
            },
            {
                label: "Likes",
                lineTension: 0.1,
                borderColor: purpleColor,
                pointBorderColor: "#FFF",
                pointBackgroundColor: purpleColor,
                pointBorderWidth: 2,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                fill: true,
                backgroundColor: "rgba(127, 143, 244, 0.2)", // <-- Diubah
                borderWidth: 2,
                data: [740, 760, 500, 720, 690, 532, 760, 820],
            },
        ],
    },
    options: visibleScaleOptions
};