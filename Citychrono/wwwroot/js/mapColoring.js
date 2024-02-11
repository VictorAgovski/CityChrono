// Example population data for Bulgarian states
const populationData = [
    { state: 'BG-01', population: 292227 },
    { state: 'BG-02', population: 380286 },
    { state: 'BG-03', population: 432198 },
    { state: 'BG-04', population: 207371 },
    { state: 'BG-05', population: 75408 },
    { state: 'BG-06', population: 152813 },
    { state: 'BG-07', population: 98387 },
    { state: 'BG-08', population: 150146 },
    { state: 'BG-09', population: 141177 },
    { state: 'BG-10', population: 111736 },
    { state: 'BG-11', population: 116394 },
    { state: 'BG-12', population: 119950 },
    { state: 'BG-13', population: 229814 },
    { state: 'BG-14', population: 114162 },
    { state: 'BG-15', population: 226120 },
    { state: 'BG-16', population: 634497 },
    { state: 'BG-17', population: 103223 },
    { state: 'BG-18', population: 193483 },
    { state: 'BG-19', population: 97770 },
    { state: 'BG-20', population: 172690 },
    { state: 'BG-21', population: 96284 },
    { state: 'BG-22', population: 231989 },
    { state: 'BG-23', population: 1274290 },
    { state: 'BG-24', population: 296507 },
    { state: 'BG-25', population: 98144 },
    { state: 'BG-26', population: 211565 },
    { state: 'BG-27', population: 151465 },
    { state: 'BG-28', population: 109693 },
];

const stateNameMapping = {
    'BG-01': 'Благоевград',
    'BG-02': 'Бургас',
    'BG-03': 'Варна',
    'BG-04': 'Велико Търново',
    'BG-05': 'Видин',
    'BG-06': 'Враца',
    'BG-07': 'Габрово',
    'BG-08': 'Добрич',
    'BG-09': 'Кърджали',
    'BG-10': 'Кюстендил',
    'BG-11': 'Ловеч',
    'BG-12': 'Монтана',
    'BG-13': 'Пазарджик',
    'BG-14': 'Перник',
    'BG-15': 'Плевен',
    'BG-16': 'Пловдив',
    'BG-17': 'Разград',
    'BG-18': 'Русе',
    'BG-19': 'Силистра',
    'BG-20': 'Сливен',
    'BG-21': 'Смолян',
    'BG-22': 'София-област',
    'BG-23': 'София-град',
    'BG-24': 'Стара Загора',
    'BG-25': 'Търговище',
    'BG-26': 'Хасково',
    'BG-27': 'Шумен',
    'BG-28': 'Ямбол',
};

const populations = populationData.map(d => d.population);
const maxPopulation = Math.max(...populations);
const minPopulation = Math.min(...populations);

const colorScale = d3.scaleLinear()
    .domain([minPopulation, maxPopulation])
    .range(["lightgreen", "darkgreen"]);

populationData.forEach(function (data) {
    const statePath = document.getElementById(data.state);
    if (statePath) {
        statePath.style.fill = colorScale(data.population);
    }
});

function showTooltip(event, stateId, population) {
    const stateName = stateNameMapping[stateId] || 'Unknown State'; // Default to 'Unknown State' if ID not found
    const formattedPopulation = new Intl.NumberFormat('en-US').format(population).replace(/,/g, ' ');
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "block";
    tooltip.style.left = event.pageX + 20 + 'px';
    tooltip.style.top = event.pageY + 20 + 'px';
    tooltip.innerHTML = `<strong>${stateName}</strong><br>Population: ${formattedPopulation}`;
}

// Function to hide the tooltip
function hideTooltip() {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
}

// Add event listeners for each state path
populationData.forEach(function (data) {
    const statePath = document.getElementById(data.state); // data.state is the ID like 'BG-01'
    if (statePath) {
        statePath.addEventListener("mouseenter", function (event) {
            showTooltip(event, data.state, data.population); // Pass the ID to showTooltip
        });
        statePath.addEventListener("mouseleave", function (event) {
            hideTooltip();
        });
    }
});