/* Check your medicine: a pilot of 15 PBS medicines.
   Sample fixed by rule before any research: the ten most-prescribed medicines on the
   PBS in 2024–25 and the five that cost the government most (Australian Prescriber).

   Event fields
     year     year of the outcome (or the year a still-open case began)
     during   [first, last] years of the conduct, where the source gives them
     issue    fraud | compete | spin | harm | factory | price
     status   paid | found | open | raised | dismissed
     by       gov (US government) | foreign (non-US government) | private | regulator | other
     related  set when the event concerns a parent or sister drug (shown, but left out of the timing figures)

   self: is the medicine itself in question? q = no | maybe | factory
   pbs:  2024–25 rank, by prescriptions (n = scripts) or by cost to government (aud, excluding rebates)
   area: grouping used by the Still on the shelf table (see shelf-data.js)
*/
window.MEDS = (function () {
  const S = (label, url) => [label, url];

  const ISSUES = [
    { id: 'fraud',   name: 'Fraud, kickbacks & illegal marketing', short: 'Fraud' },
    { id: 'compete', name: 'Blocking cheaper copies',               short: 'Competition' },
    { id: 'spin',    name: 'Research & marketing spin',             short: 'Spin' },
    { id: 'harm',    name: 'Injury lawsuits & safety signals',      short: 'Safety' },
    { id: 'factory', name: 'Factory quality',                       short: 'Factory' },
    { id: 'price',   name: 'Price & tax',                           short: 'Price' }
  ];

  const STATUS = {
    paid:      { label: 'Paid',               level: 3 },
    found:     { label: 'Proven',             level: 3 },
    open:      { label: 'In court now',       level: 2 },
    raised:    { label: 'Raised, not proven', level: 1 },
    dismissed: { label: 'Thrown out',         level: 1 }
  };

  const LIGHTS = {
    red:   { label: 'In court now',  desc: 'A live government case, class action or group of injury lawsuits over this medicine. It means payouts may be coming, not that the medicine is unsafe.' },
    amber: { label: 'Warning signs', desc: 'Nothing live in court, but an active concern: a patent wall, a pricing probe, or a safety or factory problem.' },
    green: { label: 'Quiet now',     desc: 'Nothing live that we found. Past cases can be serious, but they are resolved.' }
  };

  const PBS_SRC = S('Australian Prescriber: Top 10 drugs 2024–25', 'https://australianprescriber.tg.org.au/articles/top-10-drugs-2024%E2%80%9325.html');


  const MEDS = [
    // ───────────── top 10 by prescriptions ─────────────
    {
      id: 'rosuvastatin', area: 'heart', name: 'Rosuvastatin', brands: 'Crestor', what: 'Cholesterol (statin)',
      maker: 'AstraZeneca', co: 'astrazeneca', launch: 2003, market: 'Generic',
      pbs: { by: 'scripts', rank: 1, n: 16313366 },
      light: 'green',
      self: { q: 'no', text: 'Not in question now. Safety concerns raised in 2004 did not lead to a ban.' },
      why: 'Nothing live. The marketing fights and a failed bid to block generics are history.',
      events: [
        { year: 2003, issue: 'spin', status: 'raised', by: 'other',
          title: 'The Lancet: "AstraZeneca must retreat"',
          desc: 'The Lancet’s editor accused AstraZeneca of marketing the new statin with "adventurous statistics" before its research was complete, and urged doctors to pause before prescribing it. AstraZeneca called the editorial flawed and incorrect.',
          src: [S('Outsourcing-Pharma (2003)', 'https://www.outsourcing-pharma.com/Article/2003/10/27/Don-t-ride-the-Crestor-wave-says-Lancet')] },
        { year: 2004, issue: 'harm', status: 'raised', by: 'other',
          title: 'Petition to ban it',
          desc: 'The consumer group Public Citizen asked the FDA to take Crestor off the market, citing reports of muscle breakdown and kidney damage. The FDA kept it on sale.',
          src: [S('Public Citizen (2004)', 'https://www.citizen.org/article/petition-to-ban-cholesterol-lowering-drug-rosuvastatin-crestor/')] },
        { year: 2010, issue: 'spin', status: 'raised', by: 'other', bench: 'stop',
          title: 'Its landmark trial was stopped early',
          desc: 'The JUPITER trial was stopped for benefit after less than two years. Critics in the Archives of Internal Medicine argued that stopping early exaggerated the benefit, and noted that 9 of its 14 authors had financial ties to the sponsor.',
          src: [S('NEJM CardioExchange (2010)', 'https://blogs.nejm.org/cardioexchange/?p=1570')] },
        { year: 2016, issue: 'compete', status: 'raised', by: 'other',
          title: 'Sued the FDA to keep generics out',
          desc: 'AstraZeneca argued that a seven-year "orphan drug" exclusivity, earned for a rare inherited cholesterol disorder in children, should block every generic. A judge refused, and generics launched in the US in 2016.',
          src: [S('TCTMD (2016)', 'https://www.tctmd.com/news/judge-dismisses-astrazenecas-bid-block-generic-crestor')] },
        { year: 2018, issue: 'fraud', status: 'paid', by: 'gov', amount: '$20m',
          title: 'Texas Medicaid settlement',
          desc: '$20 million of a $110 million settlement with Texas was over allegedly misrepresenting Crestor’s benefits. AstraZeneca denied wrongdoing.',
          src: [S('CNBC (2018)', 'https://www.cnbc.com/2018/08/08/astrazeneca-settles-texas-drug-lawsuits-for-110-million.html')] }
      ],
      watch: 'Nothing live. Rosuvastatin is now made by many generic companies, so the remaining risk is factory quality, as for any generic.'
    },
    {
      id: 'atorvastatin', area: 'heart', name: 'Atorvastatin', brands: 'Lipitor', what: 'Cholesterol (statin)',
      maker: 'Pfizer', co: 'pfizer', launch: 1997, market: 'Generic',
      pbs: { by: 'scripts', rank: 2, n: 11319805 },
      light: 'green',
      self: { q: 'no', text: 'Not in question. The cases were about advertising and competition, and the diabetes lawsuits failed in court.' },
      why: 'Nothing live. A pay-for-delay case settled in 2024; an injury lawsuit failed.',
      events: [
        { year: 2008, issue: 'spin', status: 'raised', by: 'other',
          title: 'Ads pulled after a congressional inquiry',
          desc: 'Pfizer cancelled TV ads starring Robert Jarvik, an artificial-heart inventor who was not licensed to practise medicine, after members of Congress questioned them. A stunt double had done his rowing.',
          src: [S('Fierce Pharma (2008)', 'https://www.fiercepharma.com/pharma/pfizer-yanks-lipitor-ads-starring-jarvik')] },
        { year: 2012, issue: 'factory', status: 'found', by: 'regulator', tag: 'Recall',
          title: 'Generic recalled for glass particles',
          desc: 'Ranbaxy, a generic maker, recalled 41 lots of its atorvastatin after finding tiny glass particles. No injuries were reported. Ranbaxy pleaded guilty to US felony charges over its factories the following year.',
          src: [S('PharmaFile (2012)', 'https://pharmafile.com/news/glass-particles-force-recall-ranbaxy-lipitor/')], co: 'ranbaxy' },
        { year: 2018, issue: 'harm', status: 'dismissed', by: 'private',
          title: 'Diabetes lawsuits thrown out',
          desc: 'More than 3,000 women sued, saying Pfizer failed to warn that Lipitor could cause diabetes. The court ruled their expert evidence unreliable, and in 2018 the appeals court upheld Pfizer’s win.',
          src: [S('US District Court, MDL 2502', 'https://www.scd.uscourts.gov/mdlipitor/current.asp'), S('Washington Legal Foundation (2018)', 'https://www.wlf.org/case/in-re-lipitor-marketing-sales-practices-and-products-liability-litigation/')] },
        { year: 2024, during: [2008, 2011], issue: 'compete', status: 'paid', by: 'private', amount: '$128m',
          title: 'Pay-for-delay settlements',
          desc: 'US buyers said Pfizer’s 2008 patent deal with Ranbaxy delayed cheaper generic Lipitor. Pfizer settled in 2024, paying $93 million to wholesalers and $35 million to consumers and insurers.',
          src: [S('Bloomberg Law (2024)', 'https://news.bloomberglaw.com/ip-law/pfizer-settles-lipitor-antitrust-lawsuit-with-93-million-payout'), S('Law360 via Cohen Milstein (2024)', 'https://www.cohenmilstein.com/lipitor-buyers-seek-final-ok-for-35m-deal-in-antitrust-fight/')] }
      ],
      watch: 'Nothing live. Generic in the US since 2011.'
    },
    {
      id: 'pantoprazole', area: 'gut', name: 'Pantoprazole', brands: 'Somac', alias: 'Protonix', what: 'Reflux and ulcers (proton pump inhibitor)',
      maker: 'Byk Gulden (now Takeda); sold in the US by Wyeth, now Pfizer', co: 'pfizer', launch: 1994, market: 'Generic',
      pbs: { by: 'scripts', rank: 3, n: 11030917 },
      light: 'green',
      self: { q: 'no', text: 'Not in question. The fraud was about billing Medicaid, and the kidney lawsuits were settled, so no court decided them.' },
      why: 'Nothing live. One of the largest Medicaid rebate frauds on record, settled in 2016.',
      events: [
        { year: 2016, during: [2001, 2006], issue: 'fraud', status: 'paid', by: 'gov', amount: '$784.6m',
          title: 'Hid discounts from Medicaid',
          desc: 'Wyeth was alleged to have hidden deep discounts it gave hospitals on Protonix from Medicaid’s "best price" calculation, underpaying the rebates it owed. Wyeth and Pfizer paid $784.6 million.',
          src: [S('HHS-OIG (2016)', 'https://oig.hhs.gov/fraud/enforcement/wyeth-and-pfizer-agree-to-pay-7846-million-to-resolve-lawsuit-alleging-that-wyeth-underpaid-drug-rebates-to-medicaid')] },
        { year: 2023, issue: 'harm', status: 'paid', by: 'private', tag: 'Settled',
          title: 'Kidney-injury lawsuits settled',
          desc: 'Thousands of US lawsuits claimed that acid-suppressing PPIs caused kidney disease. Pfizer, which sold Protonix in the US, settled before AstraZeneca’s $425 million deal in 2023. Its amount was not disclosed.',
          src: [S('Bloomberg via BNN (2023)', 'https://www.bnnbloomberg.ca/astrazeneca-pays-425-million-to-settle-nexium-prilosec-cases-1.1979445')] }
      ],
      watch: 'Nothing live that we found.'
    },
    {
      id: 'esomeprazole', area: 'gut', name: 'Esomeprazole', brands: 'Nexium', what: 'Reflux and ulcers (proton pump inhibitor)',
      maker: 'AstraZeneca', co: 'astrazeneca', launch: 2000, market: 'Generic',
      pbs: { by: 'scripts', rank: 4, n: 7974275 },
      light: 'green',
      self: { q: 'no', text: 'Not in question. The cases were about marketing, competition and billing, and the kidney lawsuits were settled, so no court decided them.' },
      why: 'Nothing live. A textbook "evergreen" drug, with kickback and injury settlements behind it.',
      events: [
        { year: 2001, issue: 'compete', status: 'raised', by: 'other',
          title: 'The "chiral switch"',
          desc: 'Esomeprazole is one of the two mirror-image forms that make up AstraZeneca’s older omeprazole (Losec, or Prilosec in the US). It was launched as omeprazole’s patent ran out, and patients were moved across with heavy marketing. A 2022 case study calls it a textbook evergreening strategy.',
          src: [S('GaBI Journal (2022)', 'https://gabi-journal.net/?p=6301'), S('NBC News', 'https://www.nbcnews.com/news/amp/wbna20249591')] },
        { year: 2005, issue: 'compete', status: 'paid', by: 'foreign', amount: '€52.5m', related: 'omeprazole',
          title: 'EU fine over the older drug’s patents',
          desc: 'The European Commission found AstraZeneca gave patent offices "deliberately misleading" information to extend protection for omeprazole, the drug Nexium replaced, and withdrew products to block generics. The fine was €52.5 million after appeal.',
          src: [S('BioPharm International', 'https://www.biopharminternational.com/view/eu-court-dismisses-astrazeneca-appeal')] },
        { year: 2014, issue: 'compete', status: 'found', by: 'private', tag: 'Found, no damages',
          title: 'Jury: a "large and unjustified" payment',
          desc: 'In a US pay-for-delay trial, the jury found AstraZeneca’s 2008 deal with the generic maker Ranbaxy involved a large and unjustified payment, but not that it delayed generic Nexium, so no damages were awarded. The appeals court upheld the verdict in 2016.',
          src: [S('US Court of Appeals, 1st Cir. (2016)', 'https://www.ca1.uscourts.gov/sites/ca1/files/opnfiles/15-2005P-01A.pdf')] },
        { year: 2015, issue: 'fraud', status: 'paid', by: 'gov', amount: '$7.9m',
          title: 'Kickbacks for formulary placement',
          desc: 'AstraZeneca settled allegations that it cut prices on other drugs for Medco, a pharmacy-benefit manager, in return for Nexium being the only PPI on Medco’s lists. The case began as a whistleblower suit by two former employees.',
          src: [S('US DOJ (2015)', 'https://www.justice.gov/opa/pr/astrazeneca-pay-79-million-resolve-kickback-allegations')] },
        { year: 2023, issue: 'harm', status: 'paid', by: 'private', amount: '$425m', tag: 'Settled',
          title: 'Kidney-injury lawsuits',
          desc: 'AstraZeneca paid $425 million to settle US lawsuits claiming Nexium and Prilosec caused kidney disease. It said the claims were without merit.',
          src: [S('Bloomberg via BNN (2023)', 'https://www.bnnbloomberg.ca/astrazeneca-pays-425-million-to-settle-nexium-prilosec-cases-1.1979445')] }
      ],
      watch: 'Nothing live that we found.'
    },
    {
      id: 'escitalopram', area: 'mind', name: 'Escitalopram', brands: 'Lexapro', what: 'Depression and anxiety (SSRI)',
      maker: 'Lundbeck; sold in the US by Forest Laboratories, now AbbVie', co: 'abbvie', launch: 2002, market: 'Generic',
      pbs: { by: 'scripts', rank: 5, n: 6557355 },
      light: 'green',
      self: { q: 'no', text: 'Not in question for its main use. The concerns were about marketing, and about the evidence behind its approval for teenagers.' },
      why: 'Nothing live. Kickbacks and a guilty plea by its US seller, and a disputed approval for teenagers.',
      events: [
        { year: 2009, issue: 'spin', status: 'raised', by: 'other', related: 'citalopram',
          title: 'Teen approval leaned on a disputed trial',
          desc: 'The FDA approved Lexapro for 12 to 17-year-olds partly on the strength of a positive trial of its parent drug, citalopram (study MD-18). A 2016 analysis of court documents called the published report of that trial ghostwritten and said it mischaracterised the data.',
          src: [S('Fierce Biotech (2009)', 'https://www.fiercebiotech.com/biotech/forest-laboratories-inc-announces-fda-approval-of-lexapro-r-for-treatment-of-major'), S('Int. J. Risk & Safety in Medicine (2016)', 'https://journals.sagepub.com/doi/10.3233/JRS-160671')] },
        { year: 2010, issue: 'fraud', status: 'paid', by: 'gov', amount: '$313m', crim: true,
          title: 'Guilty plea and kickbacks',
          desc: 'Forest pleaded guilty to obstruction of justice, distributing an unapproved thyroid drug and promoting Celexa for children. The $313 million total also settled claims that it paid kickbacks (cash disguised as grants and consulting fees, meals and entertainment) to boost Celexa and Lexapro prescriptions.',
          src: [S('US DOJ (2010)', 'https://www.justice.gov/opa/pr/2010/September/10-civ-1028.html')] },
        { year: 2013, during: [2002, 2002], issue: 'compete', status: 'paid', by: 'foreign', amount: '€94m', related: 'citalopram',
          title: 'EU fine: paying generics to stay out',
          desc: 'The European Commission fined Lundbeck about €94 million for paying generic makers in 2002 to stay out of the market for citalopram, the older drug of which escitalopram is the active half. The EU’s top court upheld the fines in 2021.',
          src: [S('CMS (2013)', 'https://cms.law/en/bel/legal-updates/european-commission-fines-pharmaceutical-companies-in-first-pay-for-delay-case'), S('Cuatrecasas (2021)', 'https://www.cuatrecasas.com/en/latam/article/pay-for-delay-the-cjeu-confirms-e146-million-in-fines-against-four-pharmaceutical-companies-for-delaying-the-market-entry-of-a-g')] }
      ],
      note: 'Escitalopram and sertraline were both among the 12 antidepressants in Turner’s 2008 study of buried trials, shown in the science lab.',
      watch: 'Nothing live that we found.'
    },
    {
      id: 'perindopril', area: 'heart', name: 'Perindopril', brands: 'Coversyl', what: 'Blood pressure and heart failure (ACE inhibitor)',
      maker: 'Servier', launch: 1988, market: 'Generic',
      pbs: { by: 'scripts', rank: 6, n: 6375761 },
      light: 'red',
      self: { q: 'no', text: 'Not in question. The cases are about price and competition: health budgets, not patients, were the ones harmed.' },
      why: 'The NHS’s claim for more than £250 million over the delayed generic is still running.',
      events: [
        { year: 2006, issue: 'compete', status: 'raised', by: 'other',
          title: 'A new salt',
          desc: 'Servier switched Coversyl to a new form, perindopril arginine. Australia’s NPS said it was more stable in hot climates and equivalent in the body. NHS reviewers in England found no clinically significant benefit over the cheaper generic, and critics called it evergreening.',
          src: [S('NPS MedicineWise', 'https://www.nps.org.au/radar/articles/perindopril-arginine-with-indapamide-hemihydrate-coversyl-plus'), S('PrescQIPP (NHS)', 'https://www.prescqipp.info/media/1535/b59-perindopril-arginine-201.pdf')] },
        { year: 2011, issue: 'compete', status: 'open', by: 'foreign',
          title: 'NHS damages claim, still running',
          desc: 'The NHS in England sued Servier in 2011 for the extra it paid while cheaper generic perindopril was kept off the market, a claim put at more than £250 million. Servier lost key preliminary arguments in 2022 and on appeal in 2023, and the case was still active in 2026.',
          src: [S('The Pharma Letter (2022)', 'https://www.thepharmaletter.com/generics-news/setback-for-servier-in-generic-delay-case-claimed-to-have-cost-the-nhs-250-million'), S('Monckton Chambers (2023)', 'https://www.monckton.com/servier-pay-for-delay-litigation-monckton-success-for-nhs-in-the-court-of-appeal/'), S('Global Competition Review (2026)', 'https://globalcompetitionreview.com/article/uk-tribunal-rejects-nhs-evidence-request-in-pay-delay-damages-claim')] },
        { year: 2014, during: [2005, 2007], issue: 'compete', status: 'paid', by: 'foreign', amount: '€331m',
          title: 'EU fine: paying generics to stay out',
          desc: 'Between 2005 and 2007, whenever a generic maker came close to launching, Servier settled with it, with cash payments running to tens of millions of euros. The European Commission fined Servier €331 million and five generic companies €97 million. The General Court cut Servier’s fine to €228 million in 2018, and the EU Court of Justice largely upheld the case in 2024.',
          src: [S('GaBI Online (2014)', 'https://www.gabionline.net/policies-legislation/Servier-and-generics-makers-fined-for-pay-for-delay'), S('Concurrences (2018)', 'https://www.concurrences.com/en/bulletin/news-issues/december-2018/the-eu-general-court-annuls-a-decision-of-the-commission-for-wrongly-qualifying'), S('Walder Wyss (2024)', 'https://walderwyss.com/en/news/2024-06-28_judgments-of-the-court-of-justice-in-cases-c-144-19-p-c-151-19-p-c-164-19-p-c-166-19-p-c-176-19-p-c-197-19-p-c-198-19-p-c-201-19-p-c-207-19-p')] }
      ],
      note: 'Servier’s wider record includes Mediator (benfluorex), a diabetes drug widely used for weight loss and linked to heart-valve damage. In 2023 a Paris appeal court convicted Servier of fraud, aggravated deception and manslaughter, and Servier appealed again.',
      noteSrc: [S('Prescrire (2024)', 'https://english.prescrire.org/en/81/168/69302/0/2024/ArchiveNewsDetails.aspx?page=1')],
      watch: 'The NHS claim. In Australia, Coversyl is still sold alongside cheaper generics.'
    },
    {
      id: 'sertraline', area: 'mind', name: 'Sertraline', brands: 'Zoloft', what: 'Depression and anxiety (SSRI)',
      maker: 'Pfizer (the brand is now Viatris)', co: 'pfizer', launch: 1991, market: 'Generic',
      pbs: { by: 'scripts', rank: 7, n: 6245846 },
      light: 'green',
      self: { q: 'no', text: 'Not in question. The birth-defect lawsuits failed in court.' },
      why: 'Nothing live. Ghostwritten papers in the 1990s; the big injury lawsuit failed.',
      events: [
        { year: 2003, during: [1998, 2000], issue: 'spin', status: 'found', by: 'other', tag: 'Documented',
          title: 'Ghostwritten science',
          desc: 'A Pfizer document disclosed in litigation listed 85 sertraline papers being coordinated by a medical-writing agency. Healy and Cattell found agency-linked papers made up 55 of the 96 sertraline articles of 1998–2000, and were cited about five times as often as the rest.',
          src: [S('Healy & Cattell, Br J Psychiatry (2003)', 'https://doi.org/10.1192/bjp.183.1.22'), S('BMJ Open (figure)', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4120312/figure/BMJOPEN2013004777F2')] },
        { year: 2017, issue: 'harm', status: 'dismissed', by: 'private',
          title: 'Birth-defect lawsuits thrown out',
          desc: 'Families claimed Zoloft taken in pregnancy caused birth defects. The court excluded their experts’ evidence as unreliable and ended more than 300 cases, and in 2017 the appeals court upheld Pfizer’s win.',
          src: [S('HarrisMartin (2017)', 'https://harrismartin.com/publications/4/drugs/articles/21497/3rd-cir-upholds-summary-judgment-award-to-pfizer-in-zoloft-birth-defect-mdl/')] }
      ],
      note: 'Sertraline and escitalopram were both among the 12 antidepressants in Turner’s 2008 study of buried trials, shown in the science lab.',
      watch: 'Nothing live that we found.'
    },
    {
      id: 'metformin', area: 'hormones', name: 'Metformin', brands: 'Diabex, Diaformin', what: 'Type 2 diabetes',
      maker: 'Many generic makers', launch: 1957, market: 'Generic',
      pbs: { by: 'scripts', rank: 8, n: 6147265 },
      light: 'amber',
      self: { q: 'factory', text: 'The medicine is not the problem. Contamination at some factories was.' },
      why: 'A likely carcinogen turned up in some factories’ batches, including in Australia.',
      events: [
        { year: 2020, issue: 'factory', status: 'found', by: 'regulator', tag: 'Recall',
          title: 'Carcinogen contamination in the US',
          desc: 'In May 2020 the FDA asked five companies, including Teva and Apotex, to recall extended-release metformin after finding high levels of NDMA, a probable carcinogen. More makers followed.',
          src: [S('RAPS (2020)', 'https://raps.org/news-and-articles/news-articles/2020/6/fda-names-five-companies-recalling-ndma-contaminat')] },
        { year: 2020, issue: 'factory', status: 'found', by: 'regulator', tag: 'Recall',
          title: 'And in Australia',
          desc: 'TGA testing found about 30% of batches slightly above the acceptable NDMA limit (under twice the limit) and one batch at 4.4 times the limit, which was recalled. The TGA judged the risk low and told patients not to stop taking metformin.',
          src: [S('TGA (2020)', 'https://www.tga.gov.au/news/safety-alerts/metformin')] }
      ],
      watch: 'No scandal over the medicine itself. Regulators now require makers to test for this family of contaminants, so factory quality is the thing to watch.'
    },
    {
      id: 'cefalexin', area: 'infection', name: 'Cefalexin', brands: 'Keflex', what: 'Bacterial infections (antibiotic)',
      maker: 'Eli Lilly originally; now many generic makers', launch: 1969, market: 'Generic',
      pbs: { by: 'scripts', rank: 9, n: 5163370 },
      light: 'green',
      self: { q: 'no', text: 'Not in question.' },
      why: 'Nothing significant found.',
      events: [],
      watch: 'Supply rather than misconduct. When Sandoz cefalexin capsules ran short, Australia allowed an unregistered imported substitute until July 2023.',
      watchSrc: [S('Distributor notice (2023)', 'https://adpha.au/publicassets/ff527890-5c91-ed11-9116-00505696223b/Cephalexin-capsules--USP-500mg--Ascend----DHCP.pdf')]
    },
    {
      id: 'amoxicillin', area: 'infection', name: 'Amoxicillin', brands: 'Amoxil', what: 'Bacterial infections (antibiotic)',
      maker: 'Beecham (now GSK) originally; now many generic makers', launch: 1972, market: 'Generic',
      pbs: { by: 'scripts', rank: 10, n: 4965405 },
      light: 'green',
      self: { q: 'no', text: 'Not in question.' },
      why: 'Nothing significant found.',
      events: [],
      watch: 'Supply rather than misconduct. Children’s amoxicillin was short in the US from late 2022, and one big maker blamed prices too low to be worth making it. In 2024 members of Congress asked makers to explain the shortages.',
      watchSrc: [S('WebMD (2023)', 'https://www.webmd.com/children/news/20230921/cm/no-end-in-sight-for-amoxicillin-shortage'), S('House Oversight Democrats (2024)', 'https://oversightdemocrats.house.gov/news/press-releases/oversight-democrats-launch-investigation-nationwide-shortages-medications')]
    },

    // ───────────── top 5 by cost to government ─────────────
    {
      id: 'pembrolizumab', area: 'cancer', name: 'Pembrolizumab', brands: 'Keytruda', what: 'Cancer immunotherapy',
      maker: 'Merck & Co. (MSD)', co: 'merck', launch: 2014, market: 'Patented',
      pbs: { by: 'cost', rank: 1, aud: 684838086, n: 80712 },
      light: 'amber',
      self: { q: 'no', text: 'Not in question. The concerns are patents, tax, price and dose.' },
      why: 'A genuine breakthrough. The concerns are a wall of extra patents, offshore profits and price, not fraud.',
      events: [
        { year: 2021, issue: 'compete', status: 'raised', by: 'other',
          title: 'A wall of patents',
          desc: 'The patent-reform group I-MAK counted 129 patent applications on Keytruda, 74% of them not for the active ingredient, and estimated they could extend Merck’s monopoly by eight years or more beyond 2028.',
          src: [S('I-MAK (2021)', 'https://www.i-mak.org/wp-content/uploads/2021/05/I-MAK-Keytruda-deck-2021-05-03F.pdf')] },
        { year: 2022, issue: 'price', status: 'raised', by: 'gov', tag: 'Inquiry',
          title: 'Senate tax inquiry',
          desc: 'The chair of the US Senate Finance Committee said Merck booked Keytruda’s profits offshore, holding the rights in the Netherlands and making it in Ireland: 46% of its 2021 sales were in the US but only 14% of its pre-tax income. Merck said it had cooperated.',
          src: [S('Fierce Pharma (2022)', 'https://www.fiercepharma.com/pharma/merck-has-dodged-billions-us-taxes-offshoring-keytruda-profits-senate-democrats-contend')] },
        { year: 2025, issue: 'compete', status: 'raised', by: 'other',
          title: 'The "product hop"',
          desc: 'Merck launched an under-the-skin version, Keytruda Qlex. I-MAK called it a product hop: moving patients to a newly patented form before the original’s patents expire.',
          src: [S('I-MAK (2025)', 'https://www.i-mak.org/?p=5312')] },
        { year: 2026, issue: 'price', status: 'raised', by: 'other',
          title: 'Price, patents and dose',
          desc: 'An April 2026 investigation by the International Consortium of Investigative Journalists found 50 active US patents that could protect Keytruda until at least 2042, and list prices from about US$80,000 a year in Germany to US$208,000 in the US. Researchers it consulted said Merck promotes a higher dose than necessary.',
          src: [S('ICIJ (2026)', 'https://www.icij.org/investigations/cancer-calculus/keytruda-evergreening-patents-merck/')] }
      ],
      watch: 'The core patents expire from 2028. Watch whether follow-on patents and the switch to the injectable version keep cheaper biosimilars away. That version is itself in a patent fight with Halozyme, which won injunctions against it in Germany (2025) and, on 7 October 2026, the Netherlands. Merck says the patent is invalid.',
      watchSrc: [S('Fierce Pharma (2025)', 'https://www.fiercepharma.com/pharma/mercks-keytruda-sc-launch-germany-faces-new-hurdle-halozyme-scores-preliminary-injunction'), S('Halozyme (Oct 2026)', 'https://www.placera.se/pressmeddelanden/halozyme-therapeutics-halozyme-wins-injunction-stopping-manufacture-and-sale-of-merck-s-keytruda-sc-in-multiple-european-markets-20261007')]
    },
    {
      id: 'trikafta', area: 'breathing', name: 'Elexacaftor, tezacaftor and ivacaftor', short: 'Trikafta', brands: 'Trikafta', what: 'Cystic fibrosis',
      maker: 'Vertex', launch: 2019, market: 'Patented',
      pbs: { by: 'cost', rank: 2, aud: 618324241, n: 29293 },
      light: 'amber',
      self: { q: 'no', text: 'Not in question. The concern is price.' },
      why: 'Life-changing for most people with cystic fibrosis. The issue is price: about 57 times the estimated cost of making it.',
      events: [
        { year: 2022, issue: 'price', status: 'raised', by: 'other',
          title: 'Price v cost of making it',
          desc: 'A 2022 study estimated a year’s supply could be made for about US$5,700, against a US list price of about US$325,000. The estimate covers manufacturing only, not research.',
          src: [S('Guo et al., J Cyst Fibros (2022)', 'https://pubmed.ncbi.nlm.nih.gov/35440408/')] },
        { year: 2024, issue: 'price', status: 'raised', by: 'foreign', tag: 'Probe closed',
          title: 'South African competition probe',
          desc: 'South Africa’s Competition Commission investigated Vertex from 2022 over alleged excessive pricing and refusal to supply. It closed the case in December 2024 after Vertex gave undertakings, and patient groups asked in 2025 for it to be reopened.',
          src: [S('GroundUp (2024)', 'https://groundup.org.za/article/life-savingcystic-fibrosis-drugs-still-not-available-to-most'), S('STAT (2025)', 'https://www.statnews.com/pharmalot/2025/08/08/vertex-cystic-fibrosis-access-medicines-pharma-south-africa-patents-trikafta/')] }
      ],
      note: 'On the PBS since April 2022, after the government negotiated a price for a drug listed at more than A$250,000 a year per patient. Patients pay the normal PBS co-payment.',
      noteSrc: [S('The New Daily (2022)', 'https://www.thenewdaily.com.au/life/health/2022/03/27/cystic-fibrosis-drug-pbs')],
      watch: 'Price and access: still unaffordable or unavailable in many countries.'
    },
    {
      id: 'ustekinumab', area: 'immune', name: 'Ustekinumab', brands: 'Stelara', what: 'Psoriasis, Crohn’s disease and colitis',
      maker: 'Janssen (Johnson & Johnson)', co: 'jnj', launch: 2009, market: 'Biosimilars arriving',
      pbs: { by: 'cost', rank: 3, aud: 520156660, n: 74000 },
      light: 'red',
      self: { q: 'no', text: 'Not in question. The case is about competition.' },
      why: 'A certified class action accuses J&J of delaying cheaper biosimilars.',
      events: [
        { year: 2023, issue: 'compete', status: 'open', by: 'private',
          title: 'Insurers’ antitrust class action',
          desc: 'US health insurers sued in December 2023, alleging J&J kept biosimilars off the market with a patent they say was wrongly granted and by buying a rival’s patents. The court certified a class in December 2025. In January 2026 it ruled for J&J on the patent-purchase claim, but the rest of the case continues. J&J is contesting it.',
          src: [S('J&J annual report (2026)', 'https://www.sec.gov/Archives/edgar/data/200406/000020040626000016/jnj-20251228.htm'), S('Goodwin (2024)', 'https://goodwinlaw.com/en/insights/blogs/2024/01/ustekinumab-antitrust-litigation')] }
      ],
      watch: 'The class action. J&J’s settlements with biosimilar makers set US launches from 2025.'
    },
    {
      id: 'dupilumab', area: 'immune', name: 'Dupilumab', brands: 'Dupixent', what: 'Eczema and asthma',
      maker: 'Sanofi and Regeneron', co: 'sanofi', launch: 2017, market: 'Patented',
      pbs: { by: 'cost', rank: 4, aud: 485257657, n: 282908 },
      light: 'red',
      self: { q: 'maybe', text: 'Possibly. The lawsuits claim a link to a rare lymphoma, which is not proven.' },
      why: 'About 30 US lymphoma lawsuits were grouped in one federal court in June 2026. A causal link is unproven.',
      events: [
        { year: 2025, issue: 'harm', status: 'raised', by: 'regulator', tag: 'Safety signal',
          title: 'An FDA safety signal',
          desc: 'In March 2025 the FDA listed cutaneous T-cell lymphoma, a rare cancer that can look like eczema, as a potential risk it was evaluating. Studies disagree: some found many more reports than expected, and at least one large study found no increased risk.',
          src: [S('Law-journal summary (2025)', 'https://mydigitalpublication.com/article/Duped+by+Dupixent%3A+Emerging+Cutaneous+T-Cell+Lymphoma+Litigation/5073197/856941/article.html'), S('Physician’s Weekly', 'https://www.physiciansweekly.com/post/association-between-dupilumab-therapy-and-ctcl-progression')] },
        { year: 2025, issue: 'harm', status: 'open', by: 'private',
          title: 'Lymphoma lawsuits',
          desc: 'The first suits were filed in 2025. In June 2026 about 30 federal cases claiming Dupixent caused or worsened T-cell lymphoma were grouped before one judge in New Jersey, with more in state court and a proposed class action in Maryland. Sanofi says it cannot yet assess the outcome.',
          src: [S('Sanofi half-year report (2026)', 'https://www.sec.gov/Archives/edgar/data/0001121404/000162828026050803/sny-20260630_d2.htm'), S('Regeneron quarterly report (2026)', 'https://www.sec.gov/Archives/edgar/data/0000872589/000087258926000025/regn-20260630.htm'), S('AboutLawsuits (2026)', 'https://www.aboutlawsuits.com/dupixent-lawsuit/dupixent-injection-lawsuits-consolidated-mdl-ctcl-diagnoses/')] }
      ],
      watch: 'An early stage: no trials scheduled yet. Any payout depends on courts accepting a causal link.'
    },
    {
      id: 'aflibercept', area: 'cancer', name: 'Aflibercept', brands: 'Eylea', what: 'Macular degeneration (eye injections)',
      maker: 'Regeneron (US); Bayer elsewhere, including Australia', launch: 2011, market: 'Biosimilars arriving',
      pbs: { by: 'cost', rank: 5, aud: 476335237, n: 485167 },
      light: 'red',
      self: { q: 'no', text: 'Not in question. The cases are about billing and kickbacks.' },
      why: 'Two live US government fraud cases against Regeneron.',
      events: [
        { year: 2020, during: [2013, 2014], issue: 'fraud', status: 'open', by: 'gov',
          title: 'Kickbacks through a copay charity',
          desc: 'The US government alleges Regeneron gave tens of millions of dollars in 2013–14 to a supposedly independent charity to cover Medicare patients’ Eylea copays, an illegal kickback. A 2025 appeals ruling made such cases harder to prove, but the case continues. Regeneron says it has no merit.',
          src: [S('STAT (2020)', 'https://www.statnews.com/pharmalot/2020/06/24/regeneron-kickbacks-medicare-foundations/'), S('US Court of Appeals, 1st Cir. (2025)', 'https://www.ca1.uscourts.gov/sites/ca1/files/opnfiles/23-2086P-01A.pdf'), S('Regeneron quarterly report (2026)', 'https://www.sec.gov/Archives/edgar/data/0000872589/000087258926000025/regn-20260630.htm')] },
        { year: 2024, during: [2012, 2023], issue: 'fraud', status: 'open', by: 'gov',
          title: 'Inflating Medicare’s price',
          desc: 'The Justice Department alleges Regeneron hid hundreds of millions of dollars of credit-card-fee payments to distributors that should have lowered Eylea’s reported average price, inflating what Medicare paid from 2012 to 2023. It began as a whistleblower suit. A judge refused to dismiss it in 2025; Regeneron says the claims are without merit.',
          src: [S('US DOJ (2024)', 'https://www.justice.gov/opa/pr/false-claims-act-complaint-filed-against-regeneron-pharmaceuticals-fraudulent-drug-pricing'), S('Court order via Endpoints (2025)', 'https://endpoints.news/wp-content/uploads/2025/04/regeneronfalseclaimsorder.pdf')] }
      ],
      watch: 'Both cases. Under the False Claims Act, damages are tripled. Bayer, which sells Eylea in Australia, is not part of them.'
    }
  ];

  return { ISSUES, STATUS, LIGHTS, MEDS, PBS_SRC };
})();
