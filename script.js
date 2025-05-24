function getRawNumber(el) {
    return parseFloat(el.value.replace(/,/g, "")) || 0;
}

const clubEstimates = {
    "Arsenal": { "Operating Loss": "£36m", "Transfer Income": "£74m", "Excludables": "£15m", "Owner Funding": "£55m" },
    "Aston Villa": { "Operating Loss": "£27m", "Transfer Income": "£57m", "Excludables": "£14m", "Owner Funding": "£22m" },
    "Bournemouth": { "Operating Loss": "£22m", "Transfer Income": "£97m", "Excludables": "£13m", "Owner Funding": "£102m" },
    "Brentford": { "Operating Loss": "£44m", "Transfer Income": "£15m", "Excludables": "£12m", "Owner Funding": "£110m" },
    "Brighton & Hove Albion": { "Operating Loss": "£26m", "Transfer Income": "£15m", "Excludables": "£9m", "Owner Funding": "£148m" },
    "Burnley": { "Operating Loss": "£28m", "Transfer Income": "£74m", "Excludables": "£13m", "Owner Funding": "£9m" },
    "Chelsea": { "Operating Loss": "£46m", "Transfer Income": "£8m", "Excludables": "£2m", "Owner Funding": "£146m" },
    "Crystal Palace": { "Operating Loss": "£29m", "Transfer Income": "£90m", "Excludables": "£5m", "Owner Funding": "£37m" },
    "Everton": { "Operating Loss": "£77m", "Transfer Income": "£98m", "Excludables": "£13m", "Owner Funding": "£44m" },
    "Fulham": { "Operating Loss": "£37m", "Transfer Income": "£99m", "Excludables": "£14m", "Owner Funding": "£46m" },
    "Leeds United": { "Operating Loss": "£31m", "Transfer Income": "£69m", "Excludables": "£13m", "Owner Funding": "£139m" },
    "Liverpool": { "Operating Loss": "£16m", "Transfer Income": "£100m", "Excludables": "£14m", "Owner Funding": "£83m" },
    "Manchester City": { "Operating Loss": "£44m", "Transfer Income": "£71m", "Excludables": "£6m", "Owner Funding": "£146m" },
    "Manchester United": { "Operating Loss": "£54m", "Transfer Income": "£78m", "Excludables": "£11m", "Owner Funding": "£133m" },
    "Newcastle United": { "Operating Loss": "£46m", "Transfer Income": "£21m", "Excludables": "£3m", "Owner Funding": "£56m" },
    "Nottingham Forest": { "Operating Loss": "£89m", "Transfer Income": "£94m", "Excludables": "£2m", "Owner Funding": "£115m" },
    "Sheffield United": { "Operating Loss": "£39m", "Transfer Income": "£46m", "Excludables": "£6m", "Owner Funding": "£85m" },
    "Tottenham Hotspur": { "Operating Loss": "£13m", "Transfer Income": "£53m", "Excludables": "£10m", "Owner Funding": "£109m" },
    "West Ham United": { "Operating Loss": "£12m", "Transfer Income": "£96m", "Excludables": "£13m", "Owner Funding": "£97m" },
    "Wolverhampton Wanderers": { "Operating Loss": "£88m", "Transfer Income": "£59m", "Excludables": "£7m", "Owner Funding": "£80m" }
};

function calculateMaxSpend() {
    const opInput = document.getElementById("operatingLoss");
    const trInput = document.getElementById("transferIncome");
    const exInput = document.getElementById("excludableSpend");
    const fundInput = document.getElementById("ownerFunding");

    const X = getRawNumber(opInput);
    const Y = getRawNumber(trInput);
    const Z = getRawNumber(exInput);
    const F = getRawNumber(fundInput);

    const allEmpty = !opInput.value && !trInput.value && !exInput.value && !fundInput.value;

    const maxSpend = (105000000 - 3 * X + 3 * Z + F + 3 * Y) / 3;

    const formatted = allEmpty
        ? "0"
        : maxSpend.toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    document.getElementById("maxSpend").innerText = formatted;
}

document.querySelectorAll("#calculator input").forEach(input => {
    input.addEventListener("input", calculateMaxSpend);

    input.addEventListener("focus", e => {
        e.target.value = e.target.value.replace(/,/g, "");
    });

    input.addEventListener("blur", e => {
        const val = e.target.value.replace(/,/g, "");
        if (val === "") return;
        const num = parseFloat(val);
        if (!isNaN(num)) {
            e.target.value = num.toLocaleString('en-GB', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        }
    });
});

// Initialize result on page load
calculateMaxSpend();

function downloadCSV() {
    const opInput = document.getElementById("operatingLoss");
    const trInput = document.getElementById("transferIncome");
    const exInput = document.getElementById("excludableSpend");
    const fundInput = document.getElementById("ownerFunding");

    const X = getRawNumber(opInput);
    const Y = getRawNumber(trInput);
    const Z = getRawNumber(exInput);
    const F = getRawNumber(fundInput);
    const maxSpend = document.getElementById("maxSpend").innerText;

    const csv = `Operating Loss,Transfer Income,Excludable Spend,Owner Funding,Max Transfer Spend\n${X},${Y},${Z},${F},${maxSpend}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "psr_transfer_spend.csv";
    link.click();
}

function populateClubSelect() {
    const select = document.getElementById("clubSelect");
    select.innerHTML = "<option value=''>Select a club</option>";
    Object.keys(clubEstimates).forEach(club => {
        const opt = document.createElement("option");
        opt.value = club;
        opt.textContent = club;
        select.appendChild(opt);
    });
}

function updateClubInfo() {
    const club = document.getElementById("clubSelect").value;
    const infoDiv = document.getElementById("clubInfo");
    if (!club) {
        infoDiv.innerHTML = "";
        return;
    }
    const data = clubEstimates[club];
    infoDiv.innerHTML =
        `<p><strong>Operating Loss:</strong> ${data["Operating Loss"]}</p>` +
        `<p><strong>Transfer Income:</strong> ${data["Transfer Income"]}</p>` +
        `<p><strong>Excludables:</strong> ${data["Excludables"]}</p>` +
        `<p><strong>Owner Funding:</strong> ${data["Owner Funding"]}</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
    populateClubSelect();
    document.getElementById("clubSelect").addEventListener("change", updateClubInfo);
});
