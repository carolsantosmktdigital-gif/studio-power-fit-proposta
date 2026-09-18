const brl = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

async function updateExchange() {
  const fallback = 5.14;
  let rate = fallback;

  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL",
    );
    if (!response.ok) throw new Error("Cotação indisponível");
    const data = await response.json();
    rate = Number(data.USDBRL.bid) || fallback;
  } catch {
    // Mantém a última cotação de referência quando o serviço estiver indisponível.
  }

  const today = new Date();
  document.getElementById("vercel-brl").textContent =
    `≈ ${brl(20 * rate)} / mês`;
  document.getElementById("supabase-brl").textContent =
    `≈ ${brl(25 * rate)} / mês`;
  document.getElementById("exchange-note").textContent =
    `Cotação de referência em ${today.toLocaleDateString("pt-BR")}: ` +
    `US$ 1 = ${brl(rate)}. Total estimado: ${brl(45 * rate)} por mês, ` +
    "antes de impostos e tarifas. Câmbio, impostos, consumo excedente, " +
    "domínio e preços de terceiros podem sofrer alterações.";
}

updateExchange();
