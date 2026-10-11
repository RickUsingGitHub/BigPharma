/* Still on the shelf: widely prescribed medicines with a cloud over them.
   Picked by judgement for documented misconduct, lawsuits, buried data, price gouging or
   contamination, so the proportions here are NOT typical of medicines in general.
   Entries use the same fields as the pilot in meds-data.js (see the comment there), plus:
     area   pain | mind | heart | hormones | women | bones | breathing | gut | infection | immune | cancer | other
     usd    US$ millions for a payment in US dollars (other currencies are converted in the UI)
   The 15 pilot medicines from meds-data.js are added to the table by shelf.js. */
window.SHELF = (function () {
  const S = (label, url) => [label, url];

  const AREAS = [
    { id: 'pain',      name: 'Pain' },
    { id: 'mind',      name: 'Mental health & brain' },
    { id: 'heart',     name: 'Heart, blood & cholesterol' },
    { id: 'hormones',  name: 'Diabetes, weight & hormones' },
    { id: 'women',     name: 'Contraception & sexual health' },
    { id: 'bones',     name: 'Bones' },
    { id: 'breathing', name: 'Breathing' },
    { id: 'gut',       name: 'Stomach & gut' },
    { id: 'infection', name: 'Infections' },
    { id: 'immune',    name: 'Immune system' },
    { id: 'cancer',    name: 'Cancer, blood & eyes' },
    { id: 'other',     name: 'Skin, allergy & other' }
  ];

  const MEDS = [
    // ───────────── pain ─────────────
    {
      id: 'oxycodone', name: 'Oxycodone', brands: 'OxyContin, Endone, Targin', area: 'pain', what: 'Strong pain relief (opioid)',
      maker: 'Purdue Pharma; Mundipharma outside the US', co: 'purdue',
      light: 'green',
      why: 'The drug at the centre of the US opioid crisis. Two guilty pleas and a multibillion-dollar bankruptcy deal, now settled.',
      self: { q: 'known', text: 'An effective painkiller, but addictive, which is exactly the risk Purdue played down.' },
      events: [
        { year: 2007, issue: 'fraud', status: 'paid', by: 'gov', amount: '$634.5m', usd: 634.5, crim: true,
          title: 'Lied about addiction risk',
          desc: 'Purdue’s parent company and three executives pleaded guilty to misbranding OxyContin as less addictive and less prone to abuse than other opioids.',
          src: [S('JURIST (2007)', 'https://www.jurist.org/news/2007/05/oxycontin-maker-pleads-guilty-to/')] },
        { year: 2020, issue: 'fraud', status: 'paid', by: 'gov', amount: '$8.3bn agreed', usd: 225, crim: true, tag: 'Guilty plea',
          title: 'Second guilty plea: three felonies',
          desc: 'Purdue pleaded guilty to three federal felonies, including conspiring to defraud the US and paying kickbacks. Most of the $8.3 billion was an unsecured claim in bankruptcy and was never paid in full.',
          src: [S('Al Jazeera (2020)', 'https://www.aljazeera.com/economy/2020/10/21/purdue-pharma-to-pay-8-3bn-to-settle-doj-opiod-crisis-probes')] },
        { year: 2020, issue: 'spin', status: 'paid', by: 'foreign', amount: 'A$302,400', usd: 0.2,
          title: 'Australia: misleading Targin ads',
          desc: 'After an addiction specialist complained, the TGA found Mundipharma’s Targin advertising to GPs "misleading, imbalanced and otherwise inaccurate" and issued 24 infringement notices.',
          src: [S('Quartz (2020)', 'https://qz.com/1774941/mundipharma-fined-for-misleading-opioid-marketing-in-australia'), S('newsGP (2019)', 'https://www1.racgp.org.au/newsgp/racgp/opioid-marketing-scrutinised-by-tga-and-questioned')] },
        { year: 2025, issue: 'fraud', status: 'paid', by: 'gov', amount: '$7.4bn', usd: 7400,
          title: 'Bankruptcy plan approved',
          desc: 'A US court approved Purdue’s bankruptcy plan, under which the Sackler family pays up to $6.5 billion over 15 years.',
          src: [S('NY Attorney General (2025)', 'https://ag.ny.gov/press-release/2025/attorney-general-james-secures-approval-purdue-bankruptcy-plan')] }
      ]
    },
    {
      id: 'hydrocodone', name: 'Hydrocodone with paracetamol', brands: 'Norco, Vicodin', area: 'pain', what: 'Pain relief (opioid; US)',
      maker: 'Many makers; Allergan (now AbbVie) sold Norco', co: 'abbvie',
      light: 'green',
      why: 'For years the most-prescribed medicine in the US. Its makers paid into the national opioid settlements.',
      self: { q: 'known', text: 'Works for short-term pain, but carries the addiction risk of every opioid.' },
      events: [
        { year: 2022, issue: 'fraud', status: 'paid', by: 'gov', amount: '$2.37bn', usd: 2370,
          title: 'Allergan opioid settlement',
          desc: 'Allergan, former maker of Norco and Kadian, agreed to pay up to $2.37 billion to US states and localities over its opioid marketing.',
          src: [S('California AG (2022)', 'https://oag.ca.gov/node/555738')] }
      ]
    },
    {
      id: 'fentanyl', name: 'Fentanyl', brands: 'Durogesic, Actiq, Subsys', area: 'pain', what: 'Strong pain relief (opioid patches, lozenges, sprays)',
      maker: 'Janssen (J&J), Cephalon (now Teva), Insys', co: 'insys',
      light: 'green',
      why: 'A bribery scheme that put a company founder in prison, an off-label guilty plea, and J&J’s share of the opioid settlements.',
      self: { q: 'known', text: 'Essential for some cancer pain, but extremely potent and addictive.' },
      events: [
        { year: 2008, issue: 'fraud', status: 'paid', by: 'gov', amount: '$425m', usd: 425, crim: true,
          title: 'Fentanyl "lollipop" promoted off-label',
          desc: 'Cephalon pleaded guilty to promoting Actiq, a fentanyl lozenge meant only for cancer pain, and two other drugs for unapproved uses.',
          src: [S('US DOJ (2008)', 'https://www.justice.gov/opa/pr/2008/September/08-civ-860.html')] },
        { year: 2019, issue: 'fraud', status: 'paid', by: 'gov', amount: '$225m', usd: 225, crim: true,
          title: 'Bribes for fentanyl spray',
          desc: 'Insys paid doctors through sham "speaker programmes" to prescribe Subsys. Founder John Kapoor was convicted of racketeering conspiracy and jailed.',
          src: [S('WBUR (2020)', 'https://www.wbur.org/news/2020/01/23/insys-john-kapoor-bribery-trial-sentencing')] },
        { year: 2021, issue: 'fraud', status: 'paid', by: 'gov', amount: '$5bn', usd: 5000,
          title: 'J&J’s national opioid settlement',
          desc: 'J&J, maker of Durogesic patches, agreed to pay up to $5 billion over its opioid business, admitting no wrongdoing.',
          src: [S('J&J statement (2021)', 'https://www.jnj.com/johnson-johnson-statement-on-nationwide-opioid-settlement-agreement')] }
      ]
    },
    {
      id: 'buprenorphine', name: 'Buprenorphine with naloxone', brands: 'Suboxone', area: 'pain', what: 'Opioid addiction treatment',
      maker: 'Reckitt Benckiser, then Indivior',
      light: 'red',
      why: 'More than $2 billion over false safety claims for the film version. Tooth-decay lawsuits are heading to trial.',
      self: { q: 'maybe', text: 'A valuable addiction treatment. The lawsuits claim the dissolving film damages teeth; that is not proven.' },
      events: [
        { year: 2019, issue: 'fraud', status: 'paid', by: 'gov', amount: '$1.4bn', usd: 1400,
          title: 'Reckitt’s record opioid settlement',
          desc: 'Reckitt Benckiser paid $1.4 billion, then the largest opioid-related settlement, over the marketing of Suboxone.',
          src: [S('US DOJ (2020)', 'https://www.justice.gov/archives/opa/pr/indivior-solutions-pleads-guilty-felony-charge-and-indivior-entities-agree-pay-600-million')] },
        { year: 2020, issue: 'fraud', status: 'paid', by: 'gov', amount: '$600m', usd: 600, crim: true,
          title: 'False child-safety data',
          desc: 'Indivior pleaded guilty to a felony. It admitted sending Massachusetts Medicaid false data claiming its Suboxone film had the lowest rate of accidental child exposure.',
          src: [S('US DOJ (2020)', 'https://www.justice.gov/archives/opa/pr/indivior-solutions-pleads-guilty-felony-charge-and-indivior-entities-agree-pay-600-million'), S('Fierce Pharma (2020)', 'https://www.fiercepharma.com/pharma/indivior-inks-600m-settlement-to-escape-criminal-civil-claims-over-its-suboxone-film')] },
        { year: 2024, issue: 'harm', status: 'open', by: 'private',
          title: 'Tooth-decay lawsuits',
          desc: 'Thousands of US lawsuits claiming the film dissolved under the tongue caused severe tooth decay were grouped in an Ohio federal court. The first trial is reportedly set for 2028.',
          src: [S('Open Class Actions (2026)', 'https://openclassactions.com/news/suboxone-tooth-decay-lawsuit-mdl-update-2026.php')] }
      ]
    },
    {
      id: 'celecoxib', name: 'Celecoxib', brands: 'Celebrex', area: 'pain', what: 'Arthritis pain (anti-inflammatory)',
      maker: 'Pharmacia, now Pfizer', co: 'pfizer',
      light: 'green',
      why: 'Its landmark safety trial was published using only the flattering first six months of data.',
      self: { q: 'no', text: 'Not in question. The issue was how its advantages were reported.' },
      events: [
        { year: 2002, issue: 'spin', status: 'raised', by: 'other', tag: 'Criticised',
          title: 'The truncated CLASS trial',
          desc: 'The 2000 JAMA paper claimed fewer stomach ulcers than older painkillers, using six months of data from two longer trials. Critics in the BMJ showed the full data, which the FDA had, did not support the advantage. The authors defended their choice.',
          src: [S('Jüni et al., BMJ (2002)', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1123260')] },
        { year: 2016, issue: 'harm', status: 'paid', by: 'private', amount: '$486m', usd: 486,
          title: 'Investors: heart risks concealed',
          desc: 'Pfizer settled a class action by investors who said it concealed the cardiovascular risks of its COX-2 painkillers, Celebrex and Bextra.',
          src: [S('Fierce Pharma (2016)', 'https://www.fiercepharma.com/pharma/pfizer-s-bextra-settlement-tagged-at-486m')] }
      ]
    },
    {
      id: 'pregabalin', name: 'Pregabalin', brands: 'Lyrica', area: 'pain', what: 'Nerve pain and epilepsy',
      maker: 'Pfizer (now generic)', co: 'pfizer',
      light: 'green',
      why: 'Part of Pfizer’s record $2.3 billion settlement over illegal marketing.',
      self: { q: 'known', text: 'Useful for nerve pain, though misuse and dependence are recognised risks.' },
      events: [
        { year: 2009, issue: 'fraud', status: 'paid', by: 'gov', amount: 'part of $2.3bn',
          title: 'Off-label promotion',
          desc: 'Pfizer’s record settlement included civil claims that it promoted Lyrica, along with Geodon and Zyvox, for unapproved uses.',
          src: [S('ABC News (2009)', 'https://abcnews.com/Business/pfizer-fined-23-billion-illegal-marketing-off-label/story?id=8477617')] }
      ]
    },
    {
      id: 'gabapentin', name: 'Gabapentin', brands: 'Neurontin', area: 'pain', what: 'Nerve pain and epilepsy',
      maker: 'Parke-Davis/Warner-Lambert, now Pfizer (now generic)', co: 'pfizer',
      light: 'green',
      why: 'The classic off-label marketing case, plus trials whose outcomes were switched to look better.',
      self: { q: 'no', text: 'Not in question for its approved uses. The evidence for some off-label uses was distorted.' },
      events: [
        { year: 2004, issue: 'fraud', status: 'paid', by: 'gov', amount: '$430m', usd: 430, crim: true,
          title: 'Off-label campaign',
          desc: 'Warner-Lambert pleaded guilty. Neurontin had been promoted for bipolar disorder, pain and migraine, partly through paid "consultant" meetings.',
          src: [S('US DOJ (2004)', 'https://www.justice.gov/archive/opa/pr/2004/May/04_civ_322.htm')] },
        { year: 2009, issue: 'spin', status: 'found', by: 'other', tag: 'Documented', bench: 'switch',
          title: 'Switched trial outcomes',
          desc: 'Comparing internal documents with publications, researchers found that 8 of 12 published trials reported a different primary outcome from the protocol, and unfavourable results were reported with a changed outcome or not in full. Pfizer disputed the findings.',
          src: [S('Johns Hopkins (2009)', 'https://publichealth.jhu.edu/2009/dickersin-gabapentin'), S('PharmaTimes (2009)', 'https://pharmatimes.com/news/pfizer_critical_of_selective_outcome_reporting_study_984282')] },
        { year: 2010, issue: 'fraud', status: 'paid', by: 'private', amount: '$142m', usd: 142,
          title: 'Racketeering verdict',
          desc: 'A federal jury found Pfizer ran a racketeering enterprise to market Neurontin. Damages for the insurer Kaiser were trebled to $142 million.',
          src: [S('Community Catalyst (2010)', 'https://communitycatalyst.org/posts/jury-finds-pfizer-committed-fraud-and-racketeering-through-off-label-neurontin-promotions-awards-142-million-pal/')] }
      ]
    },
    {
      id: 'paracetamol', name: 'Paracetamol', brands: 'Panadol, Tylenol', area: 'pain', what: 'Pain and fever',
      maker: 'Many makers; Tylenol by McNeil (J&J), now Kenvue', co: 'jnj',
      light: 'red',
      why: 'Contaminated children’s medicine led to a guilty plea. US autism lawsuits were revived in July 2026, although the evidence for a link is weak.',
      self: { q: 'maybe', text: 'Disputed. In 2025 the US FDA began adding a caution about use in pregnancy while saying a causal link had not been established; large sibling studies found no link, and medical societies still regard it as safe when used appropriately.' },
      events: [
        { year: 2015, issue: 'factory', status: 'paid', by: 'gov', amount: '$25m', usd: 25, crim: true,
          title: 'Metal particles in children’s Tylenol',
          desc: 'McNeil pleaded guilty after shipping infants’ and children’s liquid medicines contaminated with metal particles. Prosecutors said it knew of the problem for about a year.',
          src: [S('PharmTech (2015)', 'https://www.pharmtech.com/view/mcneil-hit-25-million-fine-adulterated-medications')] },
        { year: 2023, issue: 'harm', status: 'open', by: 'private',
          title: 'Autism lawsuits revived',
          desc: 'A judge threw out hundreds of US cases claiming paracetamol in pregnancy caused autism or ADHD after excluding the plaintiffs’ experts. In July 2026 an appeals court revived them, without finding that paracetamol causes autism. The defendants sought a rehearing.',
          src: [S('Kenvue statement (2026)', 'https://www.kenvue.com/media/second-circuit-court-of-appeals-ruling'), S('Open Class Actions (2026)', 'https://openclassactions.com/news/tylenol-autism-lawsuits-revived-rehearing-sought.php')] },
        { year: 2025, issue: 'harm', status: 'raised', by: 'regulator', tag: 'Disputed signal',
          title: 'FDA caution in pregnancy',
          desc: 'The FDA said it would update the label about a possible association with autism, while acknowledging that a causal relationship had not been established. Sibling studies that control for family factors found no increased risk.',
          src: [S('Healio (2026)', 'https://www.healio.com/news/primary-care/20260312/acetaminophen-use-during-pregnancy-decreased-after-white-houses-autism-briefing')] }
      ]
    },
    // ───────────── mental health & neurology ─────────────
    {
      id: 'paroxetine', name: 'Paroxetine', brands: 'Aropax, Paxil', area: 'mind', what: 'Depression and anxiety (SSRI)',
      maker: 'GlaxoSmithKline (now generic)', co: 'gsk',
      light: 'green',
      why: 'Study 329: a trial that showed no benefit and more suicidal behaviour in teenagers was published as a success.',
      self: { q: 'no', text: 'Not in question for adults. It is not recommended for depression in under-18s.' },
      events: [
        { year: 2004, issue: 'spin', status: 'paid', by: 'gov', amount: '$2.5m', usd: 2.5,
          title: 'New York sues over hidden child trials',
          desc: 'New York’s Attorney General accused GSK of suppressing studies showing Paxil did not work in children and might raise suicidality. GSK settled and agreed to post its trial results online.',
          src: [S('BMJ (2004)', 'https://www.bmj.com/content/329/7466/590.5.full')] },
        { year: 2012, issue: 'fraud', status: 'paid', by: 'gov', amount: 'part of $3bn', crim: true,
          title: 'Guilty plea: promoting Paxil to under-18s',
          desc: 'GSK pleaded guilty to misbranding Paxil, including promoting it for under-18s, as part of a $3 billion settlement.',
          src: [S('US DOJ (2012)', 'https://www.justice.gov/opa/pr/2012/July/12-civ-842.html')] },
        { year: 2015, issue: 'spin', status: 'found', by: 'other', tag: 'Reanalysed',
          title: 'Study 329 reanalysed',
          desc: 'An independent reanalysis of the 2001 trial found paroxetine no better than placebo for adolescent depression, with clinically significant increases in harms including suicidal thoughts and behaviour. The original paper had claimed the opposite.',
          src: [S('Le Noury et al., BMJ (2015)', 'https://pubmed.ncbi.nlm.nih.gov/26376805/')] },
        { year: 2016, issue: 'compete', status: 'paid', by: 'foreign', amount: '£37.6m', usd: 54,
          title: 'UK: paying generics to stay out',
          desc: 'The UK regulator found GSK paid would-be generic rivals more than £50 million in 2001–04 to stay out of the market. When generics arrived, prices fell 70%.',
          src: [S('Pharmaceutical Journal (2016)', 'https://pharmaceutical-journal.com/article/news/gsk-fined-37-6m-for-pay-for-delay-paroxetine-deals')] }
      ]
    },
    {
      id: 'quetiapine', name: 'Quetiapine', brands: 'Seroquel', area: 'mind', what: 'Schizophrenia and bipolar disorder (antipsychotic)',
      maker: 'AstraZeneca (now generic)', co: 'astrazeneca',
      light: 'green',
      why: 'Sold for sleep, anger and dementia; internal emails talked of "cherry-picking" data and a buried weight-gain study.',
      self: { q: 'known', text: 'Effective for psychosis, but weight gain and diabetes risks are real, and off-label use for sleep is discouraged.' },
      events: [
        { year: 2009, issue: 'spin', status: 'found', by: 'other', tag: 'Documented',
          title: 'A buried weight-gain study',
          desc: 'Court-released emails showed an AstraZeneca manager complaining about "cherry-picking" data and listing buried trials, including Study 15, in which patients gained weight. AstraZeneca said the FDA had reviewed the safety data.',
          src: [S('Fierce Pharma', 'https://www.fiercepharma.com/pharma/post-resurrects-buried-seroquel-study'), S('The Pharma Letter', 'https://www.thepharmaletter.com/az-e-mail-reveals-buried-seroquel-data')] },
        { year: 2010, issue: 'fraud', status: 'paid', by: 'gov', amount: '$520m', usd: 520,
          title: 'Off-label for sleep, anger and dementia',
          desc: 'Then the largest civil-only off-label settlement, covering promotion for aggression, Alzheimer’s, anger management, anxiety, ADHD, dementia and sleeplessness.',
          src: [S('US Attorney ED Pa (2010)', 'https://www.justice.gov/archive/usao/pae/News/2010/apr/astrazeneca_release2.pdf')] },
        { year: 2018, issue: 'fraud', status: 'paid', by: 'gov', amount: '$90m', usd: 90,
          title: 'Texas Medicaid settlement',
          desc: '$90 million of a $110 million Texas settlement was over off-label Seroquel promotion. AstraZeneca denied wrongdoing.',
          src: [S('CNBC (2018)', 'https://www.cnbc.com/2018/08/08/astrazeneca-settles-texas-drug-lawsuits-for-110-million.html')] }
      ]
    },
    {
      id: 'olanzapine', name: 'Olanzapine', brands: 'Zyprexa', area: 'mind', what: 'Schizophrenia and bipolar disorder (antipsychotic)',
      maker: 'Eli Lilly (now generic)', co: 'lilly',
      light: 'green',
      why: 'A guilty plea for marketing to dementia patients, and lawsuits saying Lilly played down diabetes risks.',
      self: { q: 'known', text: 'Effective, but weight gain and diabetes are well-known risks.' },
      events: [
        { year: 2007, issue: 'harm', status: 'paid', by: 'private', amount: '$1.2bn', usd: 1200,
          title: 'Weight-gain and diabetes lawsuits',
          desc: 'About 32,000 claims said Lilly played down Zyprexa’s links to obesity and diabetes, after internal documents were leaked to the New York Times.',
          src: [S('Psychiatric News (2007)', 'https://psychnews.psychiatryonline.org/doi/10.1176/pn.42.3.0001a')] },
        { year: 2009, issue: 'fraud', status: 'paid', by: 'gov', amount: '$1.415bn', usd: 1415, crim: true,
          title: 'Guilty plea: off-label for dementia',
          desc: 'Lilly pleaded guilty to promoting Zyprexa for elderly dementia and other unapproved uses.',
          src: [S('US DOJ (2009)', 'https://www.justice.gov/archive/opa/pr/2009/January/09-civ-038.html')] }
      ]
    },
    {
      id: 'risperidone', name: 'Risperidone', brands: 'Risperdal', area: 'mind', what: 'Schizophrenia, bipolar disorder and behaviour (antipsychotic)',
      maker: 'Janssen (J&J) (now generic)', co: 'jnj',
      light: 'green',
      why: 'Marketed for children and elderly dementia patients with kickbacks; thousands of breast-growth lawsuits from boys.',
      self: { q: 'known', text: 'Useful, but hormonal side effects, including breast growth in boys, are a recognised risk.' },
      events: [
        { year: 2013, issue: 'fraud', status: 'paid', by: 'gov', amount: '$2.2bn', usd: 2200, crim: true,
          title: 'Guilty plea and kickbacks',
          desc: 'Janssen pleaded guilty to misbranding Risperdal, which had been promoted for elderly dementia patients and children, and paid kickbacks to doctors and a nursing-home pharmacy.',
          src: [S('Mintz (2013)', 'https://www.mintz.com/insights-center/viewpoints/2013-11-06-jj-will-pay-22-billion-and-enter-5-year-cia-settle-label-and')] },
        { year: 2019, issue: 'harm', status: 'paid', by: 'private', tag: 'Settled',
          title: 'Breast-growth lawsuits',
          desc: 'About 9,000 lawsuits said boys developed breasts on Risperdal. A Philadelphia jury awarded $8 billion in punitive damages in one case, cut by a judge to $6.8 million; J&J then settled substantially all the cases, setting aside $800 million.',
          src: [S('Business Insurance', 'https://www.businessinsurance.com/judge-slashes-8-billion-risperdal-award-against-jj-to-68-million/'), S('Business Insurance', 'https://www.businessinsurance.com/johnson-johnson-settles-most-risperdal-lawsuits/')] }
      ]
    },
    {
      id: 'aripiprazole', name: 'Aripiprazole', brands: 'Abilify', area: 'mind', what: 'Schizophrenia, bipolar disorder and depression (antipsychotic)',
      maker: 'Otsuka and Bristol Myers Squibb (now generic)', co: 'bms',
      light: 'green',
      why: 'Promoted for children and dementia; lawsuits over compulsive gambling were settled.',
      self: { q: 'known', text: 'Effective. Compulsive behaviours such as gambling are now a labelled risk.' },
      events: [
        { year: 2007, issue: 'fraud', status: 'paid', by: 'gov', amount: '$515m', usd: 515,
          title: 'Off-label promotion and kickbacks',
          desc: 'BMS settled claims including promotion of Abilify for children and dementia-related psychosis, consulting fees and resort trips for doctors, and inflated wholesale prices.',
          src: [S('KKC (2007)', 'https://kkc.com/news/bristol-myers-squibb-to-pay-515-million-for-doctor-kickback-scheme')] },
        { year: 2019, issue: 'harm', status: 'paid', by: 'private', tag: 'Settled',
          title: 'Compulsive gambling lawsuits',
          desc: 'BMS and Otsuka reached a confidential master settlement of US claims that Abilify caused compulsive gambling and other behaviours, disclaiming liability.',
          src: [S('BMS quarterly report (2020)', 'https://www.sec.gov/Archives/edgar/data/14272/000001427220000168/bmy-20200331x10q.htm')] }
      ],
      watch: 'Certified class actions in Quebec and Ontario were still pending in 2023.'
    },
    {
      id: 'citalopram', name: 'Citalopram', brands: 'Cipramil, Celexa', area: 'mind', what: 'Depression (SSRI)',
      maker: 'Lundbeck; sold in the US by Forest (now AbbVie)', co: 'abbvie',
      light: 'green',
      why: 'Promoted for children with kickbacks, a ghostwritten paediatric trial, and an EU fine for paying generics to stay away.',
      self: { q: 'no', text: 'Not in question for adults.' },
      events: [
        { year: 2010, issue: 'fraud', status: 'paid', by: 'gov', amount: '$313m', usd: 313, crim: true,
          title: 'Guilty plea: promoting Celexa for children',
          desc: 'Forest pleaded guilty, including to promoting Celexa for children, and settled claims it paid kickbacks to boost Celexa and Lexapro.',
          src: [S('US DOJ (2010)', 'https://www.justice.gov/opa/pr/2010/September/10-civ-1028.html')] },
        { year: 2013, during: [2002, 2002], issue: 'compete', status: 'paid', by: 'foreign', amount: '€94m', usd: 125,
          title: 'EU fine: paying generics to stay out',
          desc: 'The European Commission fined Lundbeck for paying generic makers in 2002 to stay out of the citalopram market. The EU’s top court upheld it in 2021.',
          src: [S('CMS (2013)', 'https://cms.law/en/bel/legal-updates/european-commission-fines-pharmaceutical-companies-in-first-pay-for-delay-case'), S('Cuatrecasas (2021)', 'https://www.cuatrecasas.com/en/latam/article/pay-for-delay-the-cjeu-confirms-e146-million-in-fines-against-four-pharmaceutical-companies-for-delaying-the-market-entry-of-a-g')] },
        { year: 2016, issue: 'spin', status: 'raised', by: 'other', tag: 'Criticised',
          title: 'A ghostwritten child trial',
          desc: 'An analysis of court documents called the published report of the paediatric trial MD-18 ghostwritten and said it mischaracterised the data.',
          src: [S('Int. J. Risk & Safety in Medicine (2016)', 'https://journals.sagepub.com/doi/10.3233/JRS-160671')] }
      ]
    },
    {
      id: 'venlafaxine', name: 'Venlafaxine', brands: 'Efexor-XR, Effexor', area: 'mind', what: 'Depression and anxiety (SNRI)',
      maker: 'Wyeth, now Pfizer (now generic)', co: 'pfizer',
      light: 'green',
      why: 'In Australia, Wyeth kept generics out with injunctions on a patent that was later found invalid, and had to pay for it.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2018, issue: 'compete', status: 'found', by: 'private', tag: 'Damages upheld',
          title: 'Australia: injunctions on an invalid patent',
          desc: 'Wyeth won court orders in 2009 blocking three generic suppliers; the patent was later overturned. The generic companies sued on Wyeth’s undertaking to pay for any harm, and the Federal Court upheld their claims in 2018. The Commonwealth, which had overpaid through the PBS, settled its own claim.',
          src: [S('Clayton Utz (2018)', 'https://www.claytonutz.com/insights/2018/december/commonwealth-claims-on-undertakings-continue-to-be-a-risk-for-pharmaceutical-patent-owners')] }
      ]
    },
    {
      id: 'bupropion', name: 'Bupropion', brands: 'Zyban, Wellbutrin', area: 'mind', what: 'Quitting smoking; depression',
      maker: 'GlaxoSmithKline (now generic)', co: 'gsk',
      light: 'green',
      why: 'A guilty plea for off-label promotion, and a generic version the FDA found did not work like the original.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2012, issue: 'fraud', status: 'paid', by: 'gov', amount: 'part of $3bn', crim: true,
          title: 'Guilty plea: off-label Wellbutrin',
          desc: 'GSK pleaded guilty to promoting Wellbutrin for unapproved uses such as weight loss, as part of its $3 billion settlement.',
          src: [S('US DOJ (2012)', 'https://www.justice.gov/opa/pr/2012/July/12-civ-842.html')] },
        { year: 2012, issue: 'factory', status: 'found', by: 'regulator', tag: 'Withdrawn',
          title: 'A generic that was not equivalent',
          desc: 'After patients reported it working less well, the FDA found Teva’s Budeprion XL 300 mg did not release the drug like the brand. It was pulled; the 300 mg dose had been approved on studies of the 150 mg dose.',
          src: [S('Chemistry World (2012)', 'https://chemistryworld.com/news/teva-pulls-generic-antidepressant/5507.article'), S('RAPS', 'https://www.raps.org/resource/teva-withdraws-antidepressant-after-bioequivalence.html')] }
      ]
    },
    {
      id: 'lamotrigine', name: 'Lamotrigine', brands: 'Lamictal', area: 'mind', what: 'Epilepsy and bipolar disorder',
      maker: 'GlaxoSmithKline (now generic)', co: 'gsk',
      light: 'green',
      why: 'Off-label promotion was part of GSK’s $3 billion settlement, and a deal with Teva became a test case for "pay-for-delay" without cash.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2012, issue: 'fraud', status: 'paid', by: 'gov', amount: 'part of $3bn',
          title: 'Off-label promotion and kickbacks',
          desc: 'GSK’s civil settlement resolved claims that it promoted Lamictal, Advair and Zofran for unapproved uses and paid doctors to prescribe them.',
          src: [S('US DOJ (2012)', 'https://www.justice.gov/opa/pr/2012/July/12-civ-842.html')] },
        { year: 2015, issue: 'compete', status: 'raised', by: 'private', tag: 'Allowed to proceed',
          title: 'Pay-for-delay without cash',
          desc: 'Buyers alleged GSK paid Teva to delay generic Lamictal by promising not to launch its own cheaper version. An appeals court ruled such non-cash deals can break antitrust law, and a class was certified in 2018. We could not confirm the final outcome.',
          src: [S('Life Sciences IP Review', 'https://www.lifesciencesipreview.com/news/us-court-says-pay-for-delay-settlements-do-not-need-to-involve-cash-1044')] }
      ]
    },
    {
      id: 'valproate', name: 'Sodium valproate', brands: 'Epilim, Depakote, Depakine', area: 'mind', what: 'Epilepsy and bipolar disorder',
      maker: 'Sanofi; Abbott (now AbbVie) in the US', co: 'sanofi',
      light: 'red',
      why: 'Thousands of French children were harmed in the womb; a Paris court found Sanofi at fault in a class action, and a criminal investigation is open.',
      self: { q: 'known', text: 'Effective for epilepsy, but it causes birth defects and developmental problems if taken in pregnancy. Women who could become pregnant need specialist advice; never stop it suddenly.' },
      events: [
        { year: 2012, issue: 'fraud', status: 'paid', by: 'gov', amount: '$1.5bn', usd: 1500, crim: true,
          title: 'Depakote marketed for dementia',
          desc: 'Abbott pleaded guilty. It had a sales force marketing Depakote to nursing homes to control agitated dementia patients, an unapproved use.',
          src: [S('US Attorney WD Va (2012)', 'https://www.justice.gov/archive/usao/vaw/news/abbott_07may2012.html')] },
        { year: 2020, issue: 'harm', status: 'open', by: 'foreign', tag: 'Under investigation',
          title: 'France: manslaughter investigation',
          desc: 'Sanofi was formally placed under investigation over claims it did not adequately warn about the risk to unborn children. Sanofi contests it.',
          src: [S('Sanofi annual report (2019)', 'https://www.sec.gov/Archives/edgar/data/1121404/000119312519068926/d614161d20f.htm')] },
        { year: 2022, issue: 'harm', status: 'open', by: 'private', tag: 'Found at fault',
          title: 'France: class action',
          desc: 'In the first ruling of its kind, a Paris court found Sanofi failed in its duties of care and information. Working out compensation was expected to take years.',
          src: [S('BCLP (2022)', 'https://www.bclplaw.com/en-GB/insights/historic-judgment-rendered-by-the-paris-court-in-a-french-class-action.html'), S('Fierce Pharma (2022)', 'https://www.fiercepharma.com/pharma/sanofi-ordered-french-court-compensate-epilepsy-drug-side-effects-report')] }
      ]
    },
    {
      id: 'topiramate', name: 'Topiramate', brands: 'Topamax', area: 'mind', what: 'Epilepsy and migraine',
      maker: 'Janssen (J&J) (now generic)', co: 'jnj',
      light: 'green',
      why: 'Paid outside doctors to ride along with sales reps and push it for psychiatric uses.',
      self: { q: 'no', text: 'Not in question for its approved uses.' },
      events: [
        { year: 2010, issue: 'fraud', status: 'paid', by: 'gov', amount: '$81m', usd: 81,
          title: '"Doctor for a day"',
          desc: 'Outside doctors were paid to accompany sales reps and promote Topamax for unapproved psychiatric uses.',
          src: [S('FBI Boston (2010)', 'https://www.fbi.gov/boston/press-releases/2010/bs042910.htm')] }
      ]
    },
    {
      id: 'methylphenidate', name: 'Methylphenidate', brands: 'Ritalin, Concerta', area: 'mind', what: 'ADHD',
      maker: 'Novartis (Ritalin), Janssen (Concerta) and generic makers',
      light: 'green',
      why: 'Two generic versions of Concerta were found not to work like the brand.',
      self: { q: 'factory', text: 'The medicine is not in question; two generic versions were.' },
      events: [
        { year: 2014, issue: 'factory', status: 'found', by: 'regulator', tag: 'Downgraded',
          title: 'Generics that released the drug too slowly',
          desc: 'After reports that they worked less well, the FDA found Mallinckrodt’s and Kudco’s generic Concerta released the drug more slowly late in the day, and stopped treating them as interchangeable with the brand.',
          src: [S('HealthDay (2014)', 'https://www.healthday.com/health-news/child-health/two-generic-versions-of-adhd-drug-not-as-effective-fda-693742.html'), S('RAPS', 'https://www.raps.org/resource/second-generic-version-of-adhd-drug-concerta-found.html')] }
      ]
    },
    {
      id: 'amphetamine', name: 'Mixed amphetamine salts', brands: 'Adderall', area: 'mind', what: 'ADHD',
      maker: 'Shire (now Takeda) and generic makers', co: 'takeda',
      light: 'green',
      why: 'Shire overstated Adderall XR’s benefits compared with other ADHD drugs.',
      self: { q: 'known', text: 'Effective, with known abuse potential.' },
      events: [
        { year: 2014, during: [2004, 2007], issue: 'fraud', status: 'paid', by: 'gov', amount: 'part of $56.5m',
          title: 'Overstated benefits',
          desc: 'Prosecutors said Shire promoted Adderall XR for uses lacking clinical support and overstated its efficacy over other ADHD drugs. Shire did not admit wrongdoing.',
          src: [S('Fierce Healthcare (2014)', 'https://www.fiercehealthcare.com/antifraud/shire-pharmaceuticals-settles-false-claims-charges-for-56-5m'), S('PolicyMed (2014)', 'https://policymed.com/2014/09/shire-pharmaceutical-settles-for-565-million-to-resolve-false-claims-act-allegations.html')] }
      ]
    },
    {
      id: 'lisdexamfetamine', name: 'Lisdexamfetamine', brands: 'Vyvanse', area: 'mind', what: 'ADHD and binge-eating disorder',
      maker: 'Shire (now Takeda)', co: 'takeda',
      light: 'green',
      why: 'Sales staff made misleading claims that it was harder to abuse.',
      self: { q: 'known', text: 'Effective, with known abuse potential.' },
      events: [
        { year: 2014, during: [2007, 2010], issue: 'fraud', status: 'paid', by: 'gov', amount: 'part of $56.5m', usd: 56.5,
          title: 'Misleading claims about abuse',
          desc: 'Prosecutors said Shire’s sales staff made misleading statements about Vyvanse’s abuse potential, although no Shire study had concluded it could not be abused. The $56.5 million settlement also covered Adderall XR.',
          src: [S('Fierce Healthcare (2014)', 'https://www.fiercehealthcare.com/antifraud/shire-pharmaceuticals-settles-false-claims-charges-for-56-5m')] }
      ]
    },
    {
      id: 'memantine', name: 'Memantine', brands: 'Ebixa, Namenda', area: 'mind', what: 'Alzheimer’s disease',
      maker: 'Lundbeck; Forest/Actavis in the US (now AbbVie)', co: 'abbvie',
      light: 'green',
      why: 'The leading "product hop" case: a plan to withdraw the old tablet to force patients onto a newly patented version.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2015, issue: 'compete', status: 'found', by: 'gov', tag: 'Blocked by court',
          title: 'A forced switch blocked',
          desc: 'Actavis planned to stop selling twice-daily Namenda as generics approached, pushing patients to a once-daily version with longer patents. On a New York lawsuit, a court ordered it to keep the old version on sale, and the appeals court agreed it likely broke antitrust law.',
          src: [S('Arnold & Porter (2015)', 'https://arnoldporter.com/en/perspectives/publications/2015/06/20150601_antitrust_alert_second_circuit__11888'), S('AMA Journal of Ethics (2015)', 'https://journalofethics.ama-assn.org/article/legal-test-pharmaceutical-company-practice-product-hopping/2015-08')] }
      ]
    },
    {
      id: 'pramipexole', name: 'Pramipexole', brands: 'Sifrol, Mirapex', area: 'mind', what: 'Parkinson’s disease and restless legs',
      maker: 'Boehringer Ingelheim (now generic)',
      light: 'green',
      why: 'A jury found the makers liable after a patient developed a gambling addiction; many cases settled.',
      self: { q: 'known', text: 'Effective. Compulsive gambling, shopping and other impulse problems are now a labelled risk.' },
      events: [
        { year: 2008, issue: 'harm', status: 'paid', by: 'private', amount: '$8.2m', usd: 8.2,
          title: 'Gambling verdict',
          desc: 'A Minnesota federal jury awarded $8.2 million, mostly punitive, against Boehringer Ingelheim and Pfizer to a patient who developed pathological gambling on Mirapex. Many other cases settled confidentially.',
          src: [S('HarrisMartin (2008)', 'https://www.harrismartin.com/publications/4/drugs/articles/9640/federal-jury-awards-82-million-to-compulsive-gambler-in-mirapex-case/')] }
      ]
    },
    {
      id: 'modafinil', name: 'Modafinil', brands: 'Modavigil, Provigil', area: 'mind', what: 'Narcolepsy and shift-work sleepiness',
      maker: 'Cephalon (now Teva) (now generic)', co: 'teva',
      light: 'green',
      why: 'An off-label guilty plea, and record US and EU penalties for paying generic makers to stay away.',
      self: { q: 'no', text: 'Not in question for its approved uses.' },
      events: [
        { year: 2008, issue: 'fraud', status: 'paid', by: 'gov', amount: 'part of $425m', crim: true,
          title: 'Off-label promotion',
          desc: 'Cephalon pleaded guilty to promoting Provigil and two other drugs for unapproved uses.',
          src: [S('US DOJ (2008)', 'https://www.justice.gov/opa/pr/2008/September/08-civ-860.html')] },
        { year: 2015, issue: 'compete', status: 'paid', by: 'gov', amount: '$1.2bn', usd: 1200,
          title: 'Record pay-for-delay settlement',
          desc: 'Cephalon paid four generic makers about $300 million to delay cheaper Provigil. Its $1.2 billion settlement with the FTC was the agency’s largest.',
          src: [S('FTC (2015)', 'https://www.ftc.gov/news-events/news/press-releases/2015/05/ftc-settlement-cephalon-pay-delay-case-ensures-12-billion-ill-gotten-gains-relinquished-refunds-will')] },
        { year: 2020, issue: 'compete', status: 'paid', by: 'foreign', amount: '€60.5m', usd: 72,
          title: 'EU pay-for-delay fine',
          desc: 'The European Commission fined Teva and Cephalon for a deal that delayed generic modafinil.',
          src: [S('Herbert Smith Freehills (2020)', 'https://www.hsfkramer.com/notes/crt/2020-11/the-european-commission-fines-cephalon-and-teva-e60-5-million-in-its-fourth-pay-for-delay-decision')] }
      ]
    },
    {
      id: 'phenytoin', name: 'Phenytoin', brands: 'Dilantin, Epanutin', area: 'mind', what: 'Epilepsy',
      maker: 'Pfizer and Flynn Pharma', co: 'pfizer',
      light: 'green',
      why: 'An old epilepsy drug whose NHS price rose up to 1,600% overnight after a "de-branding" deal.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2024, issue: 'price', status: 'paid', by: 'foreign', amount: '£63m', usd: 80,
          title: 'UK: excessive pricing',
          desc: 'The UK competition regulator found Pfizer raised phenytoin’s NHS price by 780–1,600% after a deal with Flynn Pharma. The fine was quashed, re-imposed in 2022 and upheld by the Competition Appeal Tribunal.',
          src: [S('UK Government (2024)', 'https://gov.uk/government/news/tribunal-fines-drug-firms-69m-for-excessive-pricing-after-cma-investigation')] }
      ]
    },
    {
      id: 'varenicline', name: 'Varenicline', brands: 'Champix, Chantix', area: 'mind', what: 'Quitting smoking',
      maker: 'Pfizer (now mostly generic)', co: 'pfizer',
      light: 'red',
      why: 'Pulled worldwide in 2021 for a carcinogenic impurity; a US buyers’ settlement is awaiting final approval.',
      self: { q: 'factory', text: 'The medicine works; the problem was an impurity from manufacturing. Generic versions are available.' },
      events: [
        { year: 2021, issue: 'factory', status: 'found', by: 'regulator', tag: 'Recall',
          title: 'Nitrosamine impurity',
          desc: 'Pfizer recalled Chantix after tablets were found to contain N-nitroso-varenicline, a nitrosamine impurity, above the acceptable limit.',
          src: [S('Endpoints', 'https://endpts.com/pfizers-off-the-hook-after-federal-judge-dismisses-proposed-lawsuit-over-chantix-recalls/'), S('Open Class Actions (2026)', 'https://openclassactions.com/settlements/pharmaceuticals/chantix-varenicline-class-action-settlement.php')] },
        { year: 2026, issue: 'factory', status: 'open', by: 'private', amount: '$44m', tag: 'Settlement pending',
          title: 'Buyers’ settlement',
          desc: 'US consumers and insurers who paid for Chantix in 2015–21 settled for $44 million, preliminarily approved in June 2026. Pfizer denies wrongdoing.',
          src: [S('Open Class Actions (2026)', 'https://openclassactions.com/settlements/pharmaceuticals/chantix-varenicline-class-action-settlement.php')] }
      ]
    },
    {
      id: 'vortioxetine', name: 'Vortioxetine', brands: 'Brintellix, Trintellix', area: 'mind', what: 'Depression',
      maker: 'Lundbeck and Takeda', co: 'takeda',
      light: 'green',
      why: 'Takeda settled claims it paid doctors to prescribe it.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2026, issue: 'fraud', status: 'paid', by: 'gov', amount: '$13.67m', usd: 13.67,
          title: 'Kickbacks to doctors',
          desc: 'Takeda settled False Claims Act allegations that it made improper payments to doctors to induce Trintellix prescriptions.',
          src: [S('US DOJ (2026)', 'https://www.justice.gov/opa/pr/takeda-agrees-pay-136m-resolve-false-claims-allegations-relating-improper-payments')] }
      ]
    },
    {
      id: 'rimegepant', name: 'Rimegepant', brands: 'Nurtec ODT', area: 'mind', what: 'Migraine',
      maker: 'Biohaven, now Pfizer', co: 'pfizer',
      light: 'green',
      why: 'Speaker fees and lavish meals to induce prescriptions, before Pfizer bought the company.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2025, issue: 'fraud', status: 'paid', by: 'gov', amount: '$59.7m', usd: 59.7,
          title: 'Speaker-programme kickbacks',
          desc: 'Biohaven allegedly paid doctors speaker fees and bought them lavish meals to induce prescriptions of Nurtec.',
          src: [S('Mayer Brown (2025)', 'https://www.mayerbrown.com/en/insights/publications/2025/10/a-false-claims-act-fy-2025-year-in-review')] }
      ]
    },
    // ───────────── heart, blood & cholesterol ─────────────
    {
      id: 'clopidogrel', name: 'Clopidogrel', brands: 'Plavix, Iscover', area: 'heart', what: 'Preventing heart attacks and strokes (antiplatelet)',
      maker: 'Sanofi and Bristol Myers Squibb (now generic)', co: 'bms',
      light: 'green',
      why: 'A secret deal hidden from US regulators, a $700 million settlement over Asian and Pacific Islander patients, and an Australian High Court fight.',
      self: { q: 'known', text: 'Effective for most people, but it works less well in people with a common genetic variant, more frequent in East Asian and Pacific Islander populations.' },
      events: [
        { year: 2007, issue: 'compete', status: 'paid', by: 'gov', amount: '$1m', usd: 1, crim: true,
          title: 'Lied to the FTC about a Plavix deal',
          desc: 'BMS pleaded guilty to making false statements. A senior executive had made a secret side-promise to the generic maker Apotex and hid it from the FTC. The CEO was ousted.',
          src: [S('US DOJ (2007)', 'https://www.justice.gov/archive/opa/pr/2007/May/07_at_388.html')] },
        { year: 2024, issue: 'compete', status: 'dismissed', by: 'foreign', tag: 'Claim failed',
          title: 'Australia: the Commonwealth’s PBS claim',
          desc: 'Sanofi won an injunction blocking Apotex’s generic on a patent later found invalid. The Commonwealth sued for what the PBS overpaid in the meantime, but lost in the High Court in December 2024 because it could not prove a generic would have been listed.',
          src: [S('Clayton Utz (2024)', 'https://www.claytonutz.com/insights/2024/december/high-court-of-australia-confirms-limits-on-undertaking-as-to-damages-commonwealth-loses-appeal-in-clopidogrel-pbs-claim')] },
        { year: 2025, issue: 'harm', status: 'paid', by: 'gov', amount: '$700m', usd: 700,
          title: 'Hawaii: reduced effect in some patients',
          desc: 'Hawaii argued that BMS and Sanofi knew Plavix worked less well in many East Asian and Pacific Islander patients but did not update the label. After court awards of $834 million and $916 million, the companies settled for $700 million.',
          src: [S('Insurance Journal (2025)', 'https://amp.insurancejournal.com/news/west/2025/05/12/823332.htm')] }
      ]
    },
    {
      id: 'rivaroxaban', name: 'Rivaroxaban', brands: 'Xarelto', area: 'heart', what: 'Blood thinner',
      maker: 'Bayer and Janssen (J&J)', co: 'bayer',
      light: 'green',
      why: '$775 million for bleeding lawsuits, and questions over a faulty device used in its key trial.',
      self: { q: 'known', text: 'Effective. Bleeding is the known risk of every blood thinner.' },
      events: [
        { year: 2016, issue: 'spin', status: 'raised', by: 'other', tag: 'Disputed',
          title: 'A faulty monitor in the key trial',
          desc: 'The BMJ reported that Janssen withheld problems with the INRatio device, used to adjust warfarin doses in the comparison group of the ROCKET AF trial, from the FDA. Falsely low readings could have inflated bleeding on warfarin. The companies denied it, and a reanalysis found no significant effect.',
          src: [S('BMJ investigation (2016)', 'https://www.bmj.com/content/354/bmj.i5131.full'), S('TCTMD', 'https://www.tctmd.com/show.aspx?id=136254')] },
        { year: 2019, issue: 'harm', status: 'paid', by: 'private', amount: '$775m', usd: 775,
          title: 'Bleeding lawsuits',
          desc: 'About 25,000 US lawsuits over bleeding risks were settled for $775 million, split between Bayer and J&J, without admission of liability.',
          src: [S('CNBC (2019)', 'https://www.cnbc.com/2019/03/25/bayer-jj-settle-blood-thinner-xarelto-litigation-for-775-million.html')] }
      ]
    },
    {
      id: 'dabigatran', name: 'Dabigatran', brands: 'Pradaxa', area: 'heart', what: 'Blood thinner',
      maker: 'Boehringer Ingelheim',
      light: 'green',
      why: 'About $650 million to settle bleeding lawsuits; the BMJ said the company kept internal analyses from regulators.',
      self: { q: 'known', text: 'Effective. Bleeding is the known risk, and a reversal agent now exists.' },
      events: [
        { year: 2014, issue: 'harm', status: 'paid', by: 'private', amount: '$650m', usd: 650,
          title: 'Bleeding lawsuits',
          desc: 'Boehringer agreed to pay about $650 million to settle roughly 4,000 US claims over inadequate warnings of severe bleeding, saying the claims lacked merit.',
          src: [S('ABA Journal (2014)', 'https://www.abajournal.com/news/article/pradaxa_suits_will_be_settled_for_about_650m_drug_maker_says')] },
        { year: 2014, issue: 'spin', status: 'raised', by: 'other', tag: 'Disputed',
          title: 'Unshared analyses on blood tests',
          desc: 'A BMJ investigation said internal analyses found fivefold variation in blood levels and that monitoring could cut major bleeds by 30–40% compared with warfarin, but these were not shared with doctors or regulators. Boehringer disputed this.',
          src: [S('The Pharma Letter (2014)', 'https://thepharmaletter.com/pharmaceutical/bmj-alleges-boehringer-ingelheim-withheld-pradaxa-dosing-information-from-regulators')] }
      ]
    },
    {
      id: 'apixaban', name: 'Apixaban', brands: 'Eliquis', area: 'heart', what: 'Blood thinner',
      maker: 'Bristol Myers Squibb and Pfizer', co: 'bms',
      light: 'green',
      why: 'Its approval was delayed after records were altered at trial sites in China.',
      self: { q: 'no', text: 'Not in question. FDA reviewers concluded the main results held.' },
      events: [
        { year: 2012, issue: 'spin', status: 'found', by: 'regulator', tag: 'Documented',
          title: 'Altered records in the key trial',
          desc: 'BMS told the FDA that a site manager in Shanghai and a contractor had altered records to hide problems in the ARISTOTLE trial. FDA documents showed concerns about data from many China sites; one official wrote the application would have been refused had the agency known earlier. Reviewers concluded the main results were not substantially changed.',
          src: [S('NEJM CardioExchange (2013)', 'https://blogs.nejm.org/cardioexchange/2013/06/24/roller-coaster-path-to-approval-for-eliquis-uncovered-by-fda-documents/'), S('MDedge', 'https://mdedge.com/content/fraud-errors-were-behind-delay-apixaban-approval-report-shows')] }
      ]
    },
    {
      id: 'ticagrelor', name: 'Ticagrelor', brands: 'Brilinta, Brilique', area: 'heart', what: 'Preventing heart attacks (antiplatelet)',
      maker: 'AstraZeneca', co: 'astrazeneca',
      light: 'amber',
      why: 'Its landmark trial was investigated by US prosecutors, and a 2024 BMJ investigation raised new questions about its data.',
      self: { q: 'no', text: 'Not in question by regulators, although the size of its advantage is debated.' },
      events: [
        { year: 2013, issue: 'spin', status: 'raised', by: 'gov', tag: 'Closed, no action',
          title: 'Justice Department investigation',
          desc: 'Prosecutors demanded documents about the PLATO trial after critics pointed to inconsistencies, including much of the benefit coming from two countries. The department later closed the investigation with no action.',
          src: [S('MDedge', 'https://mdedge.com/content/doj-closes-investigation-plato-trial')] },
        { year: 2024, issue: 'spin', status: 'raised', by: 'other', tag: 'Criticised',
          title: 'New questions about the data',
          desc: 'A BMJ investigation, using trial records obtained under freedom of information, reported problems with how PLATO’s data were reported. The trial’s investigators have defended the results.',
          src: [S('BMJ Group (2024)', 'https://bmjgroup.com/investigation-raises-new-concerns-over-landmark-trial-for-top-selling-anti-platelet-drug'), S('News-Medical (2024)', 'https://www.news-medical.net/news/20241211/Controversy-surrounds-landmark-anti-platelet-drug-trial.aspx')] }
      ]
    },
    {
      id: 'valsartan', name: 'Valsartan', brands: 'Diovan', area: 'heart', what: 'Blood pressure (ARB)',
      maker: 'Novartis; generics from many makers, including Zhejiang Huahai', co: 'novartis',
      light: 'red',
      why: 'Faked research in Japan, then a probable carcinogen in generic batches worldwide. Lawsuits over the contamination are still running.',
      self: { q: 'factory', text: 'The medicine is not in question. Some generic batches made with one supplier’s ingredient were contaminated.' },
      events: [
        { year: 2013, issue: 'spin', status: 'found', by: 'other', tag: 'Documented',
          title: 'Japan: manipulated research',
          desc: 'University studies claiming extra benefits for Diovan were found to rest on manipulated data, and a Novartis employee had secretly helped with the statistics. A court accepted the data were manipulated but acquitted, ruling that a paper is not an advertisement.',
          src: [S('Fierce Pharma', 'https://www.fiercepharma.com/pharma/judge-japan-lets-novartis-off-hook-advertising-scandal')] },
        { year: 2018, issue: 'factory', status: 'found', by: 'regulator', tag: 'Recall',
          title: 'A probable carcinogen in generic batches',
          desc: 'NDMA was found in valsartan ingredient from Zhejiang Huahai, linked to a 2011 manufacturing change, triggering recalls worldwide. The FDA banned imports from the plant and issued a warning letter.',
          src: [S('AAFP (2018)', 'https://www.aafp.org/about/news/20180725valsartan'), S('Fierce Pharma (2021)', 'https://www.fiercepharma.com/manufacturing/3-years-valsartan-recall-zhejiang-huahai-china-drug-manufacturer-fda-warning-letter')] },
        { year: 2019, issue: 'factory', status: 'open', by: 'private',
          title: 'Contamination lawsuits',
          desc: 'US lawsuits over contaminated valsartan, losartan and irbesartan were grouped in a New Jersey federal court in 2019. Small buyer settlements with some makers were provisionally approved in 2026; Teva reported 231 personal-injury cases against it, with trials expected no earlier than 2027.',
          src: [S('JPML transfer order (2019)', 'https://www.jpml.uscourts.gov/sites/jpml/files/MDL-2875-Initial_Transfer-01-19.pdf'), S('Teva quarterly report (2026)', 'https://www.sec.gov/Archives/edgar/data/0000818686/000119312526323619/d118828d10q.htm')] }
      ]
    },
    {
      id: 'losartan', name: 'Losartan', brands: 'Cozaar', area: 'heart', what: 'Blood pressure (ARB)',
      maker: 'Merck originally; now many generic makers',
      light: 'red',
      why: 'Generic batches contaminated with nitrosamines were recalled; part of the ongoing US lawsuits.',
      self: { q: 'factory', text: 'The medicine is not in question; some generic batches were contaminated.' },
      events: [
        { year: 2019, issue: 'factory', status: 'found', by: 'regulator', tag: 'Recall',
          title: 'Nitrosamine recalls',
          desc: 'After valsartan, the FDA found the probable carcinogens NDEA and NMBA in some losartan and irbesartan batches, leading to recalls. Not all lots were affected.',
          src: [S('FDA: ARB recalls', 'https://www.fda.gov/ARBrecalls'), S('American College of Cardiology (2019)', 'https://acc.org/Latest-in-Cardiology/Articles/2019/01/07/12/42/Heart-of-Health-Policy-Additional-ARBs-Added-to-FDA-Recall-List-Due-to-Contamination')] },
        { year: 2019, issue: 'factory', status: 'open', by: 'private',
          title: 'Part of the contamination lawsuits',
          desc: 'Losartan claims are part of the New Jersey federal litigation over contaminated blood-pressure drugs, which was still running in 2026.',
          src: [S('Teva quarterly report (2026)', 'https://www.sec.gov/Archives/edgar/data/0000818686/000119312526323619/d118828d10q.htm')] }
      ]
    },
    {
      id: 'irbesartan', name: 'Irbesartan', brands: 'Avapro, Karvea', area: 'heart', what: 'Blood pressure (ARB)',
      maker: 'Sanofi originally; now many generic makers',
      light: 'red',
      why: 'Some generic batches were recalled for a probable carcinogen in the US and UK; part of the ongoing US lawsuits.',
      self: { q: 'factory', text: 'The medicine is not in question; some generic batches were contaminated.' },
      events: [
        { year: 2019, issue: 'factory', status: 'found', by: 'regulator', tag: 'Recall',
          title: 'Nitrosamine recalls',
          desc: 'Regulators in the US and UK recalled batches of irbesartan after testing found possible contamination with NDEA.',
          src: [S('FDA: ARB recalls', 'https://www.fda.gov/ARBrecalls'), S('Pharmaceutical Journal (2019)', 'https://pharmaceutical-journal.com/?p=18476')] },
        { year: 2019, issue: 'factory', status: 'open', by: 'private',
          title: 'Part of the contamination lawsuits',
          desc: 'Irbesartan claims are part of the New Jersey federal litigation over contaminated blood-pressure drugs, which was still running in 2026.',
          src: [S('Teva quarterly report (2026)', 'https://www.sec.gov/Archives/edgar/data/0000818686/000119312526323619/d118828d10q.htm')] }
      ]
    },
    {
      id: 'telmisartan', name: 'Telmisartan', brands: 'Micardis', area: 'heart', what: 'Blood pressure (ARB)',
      maker: 'Boehringer Ingelheim (now generic)',
      light: 'green',
      why: 'Promoted for a kidney use that was never approved.',
      self: { q: 'no', text: 'Not in question for blood pressure.' },
      events: [
        { year: 2012, during: [2000, 2008], issue: 'fraud', status: 'paid', by: 'gov', amount: '$95m', usd: 95,
          title: 'Off-label promotion',
          desc: 'Boehringer settled claims that it promoted Micardis for early diabetic kidney disease, and three other drugs for unapproved uses, without admitting liability.',
          src: [S('US Attorney, Maryland (2012)', 'https://www.justice.gov/archive/usao/md/news/2012/BoehringerIngelheimtoPay95MilliontoResolveOff-labelPromotionandKickbackAllegations.html')] }
      ]
    },
    {
      id: 'ezetimibe', name: 'Ezetimibe', brands: 'Ezetrol, Zetia; with simvastatin, Vytorin', area: 'heart', what: 'Cholesterol',
      maker: 'Merck (Schering-Plough) (now generic)', co: 'merck',
      light: 'green',
      why: 'Bad trial results were sat on for two years, and a deal allegedly delayed the generic.',
      self: { q: 'no', text: 'Not in question. It lowers cholesterol; later trials found a modest benefit when added to a statin.' },
      events: [
        { year: 2013, issue: 'spin', status: 'paid', by: 'private', amount: '$688m', usd: 688,
          title: 'ENHANCE: results delayed',
          desc: 'Investors sued after Merck and Schering-Plough sat on the ENHANCE trial for about two years. It showed Vytorin did no better than cheap simvastatin at reducing artery plaque.',
          src: [S('BLB&G (2013)', 'https://www.blbglaw.com/news/updates/2013-02-14-blbg-recovers-688-million-from-merck-and-schering-plough-in-securities-fraud-litigation')] },
        { year: 2023, issue: 'compete', status: 'paid', by: 'private', amount: '$573m', usd: 573,
          title: 'Pay-for-delay settlement',
          desc: 'Buyers alleged Merck’s 2010 patent deal with Glenmark delayed generic Zetia and included a promise not to launch its own cheaper version. Merck settled on the eve of trial.',
          src: [S('Bloomberg Law (2023)', 'https://news.bloomberglaw.com/antitrust/merck-discloses-573-million-settlement-in-zetia-antitrust-suit'), S('Edgeworth Economics', 'https://edgewortheconomics.com/antitrustprescription-Merck-and-Glenmark-Settle-on-the-Eve-of-a-Rare-Pay-For-Delay-Trial')] }
      ]
    },
    {
      id: 'simvastatin', name: 'Simvastatin', brands: 'Zocor, Lipex', area: 'heart', what: 'Cholesterol (statin)',
      maker: 'Merck (now generic)', co: 'merck',
      light: 'green',
      why: 'Discounts were disguised to cut Medicaid rebates.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2008, issue: 'fraud', status: 'paid', by: 'gov', amount: '$650m', usd: 650,
          title: 'Medicaid "best price" fraud',
          desc: 'Merck labelled deep hospital discounts on Zocor, Vioxx and Pepcid as "nominal" prices to keep them out of Medicaid rebate calculations, and allegedly paid doctors disguised as training fees.',
          src: [S('US DOJ (2008)', 'https://www.justice.gov/opa/pr/2008/February/08_civ_094.html')] }
      ]
    },
    {
      id: 'pravastatin', name: 'Pravastatin', brands: 'Pravachol', area: 'heart', what: 'Cholesterol (statin)',
      maker: 'Generic makers including Teva and Glenmark',
      light: 'green',
      why: 'Generic makers conspired to raise its price; two signed deferred prosecution agreements.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2023, during: [2013, 2015], issue: 'price', status: 'paid', by: 'gov', amount: '$255m', usd: 255,
          title: 'Price-fixing',
          desc: 'Teva and Glenmark admitted conspiring with rivals to raise the price of pravastatin and other generics. They paid $225 million and $30 million and had to sell their pravastatin businesses.',
          src: [S('US DOJ (2023)', 'https://www.justice.gov/archives/opa/pr/major-generic-drug-companies-pay-over-quarter-billion-dollars-resolve-price-fixing-charges'), S('Fierce Pharma (2023)', 'https://www.fiercepharma.com/pharma/teva-glenmark-reach-price-fixing-settlement-doj-225-million-and-30-million-agree-divest')] }
      ],
      watch: 'Civil claims over generic price-fixing have continued; Glenmark later agreed a further $25 million over pravastatin.'
    },
    // ───────────── diabetes, weight & hormones ─────────────
    {
      id: 'insulin-glargine', name: 'Insulin glargine', brands: 'Lantus, Optisulin, Toujeo', area: 'hormones', what: 'Diabetes (long-acting insulin)',
      maker: 'Sanofi', co: 'sanofi',
      light: 'red',
      why: 'One of the three insulin makers being sued with the big US pharmacy-benefit managers over an alleged price-inflation scheme.',
      self: { q: 'no', text: 'Not in question. The cases are about price.' },
      events: [
        { year: 2023, issue: 'price', status: 'open', by: 'gov',
          title: 'US insulin pricing lawsuits',
          desc: 'States, cities and other payers allege that Lilly, Novo Nordisk and Sanofi raised list prices in step while paying bigger rebates to the pharmacy-benefit managers CVS Caremark, Express Scripts and OptumRx. About 514 cases were grouped in a New Jersey federal court by July 2026. The companies deny wrongdoing, and none has been found liable.',
          src: [S('Open Class Actions (2026)', 'https://openclassactions.com/lawsuits/insulin-pricing-mdl-lawsuit.php'), S('Mealey’s (2026)', 'https://www.mealeys.com/mealeys/articles/2426230')] }
      ]
    },
    {
      id: 'insulin-lispro', name: 'Insulin lispro', brands: 'Humalog', area: 'hormones', what: 'Diabetes (mealtime insulin)',
      maker: 'Eli Lilly', co: 'lilly',
      light: 'red',
      why: 'Part of the US insulin pricing lawsuits; Lilly has also faced a Medicaid rebate fraud judgment.',
      self: { q: 'no', text: 'Not in question. The cases are about price.' },
      events: [
        { year: 2023, issue: 'price', status: 'open', by: 'gov',
          title: 'US insulin pricing lawsuits',
          desc: 'Lilly is a defendant in the grouped US cases alleging insulin list prices were inflated in a rebate scheme with pharmacy-benefit managers. In 2024 Lilly agreed to cap insulin at $35 a month for Minnesota residents to settle that state’s claims.',
          src: [S('Open Class Actions (2026)', 'https://openclassactions.com/lawsuits/insulin-pricing-mdl-lawsuit.php')] }
      ]
    },
    {
      id: 'insulin-aspart', name: 'Insulin aspart', brands: 'NovoRapid, Novolog, Fiasp', area: 'hormones', what: 'Diabetes (mealtime insulin)',
      maker: 'Novo Nordisk', co: 'novo',
      light: 'red',
      why: 'Part of the US insulin pricing lawsuits.',
      self: { q: 'no', text: 'Not in question. The cases are about price.' },
      events: [
        { year: 2023, issue: 'price', status: 'open', by: 'gov',
          title: 'US insulin pricing lawsuits',
          desc: 'Novo Nordisk is a defendant in the grouped US cases alleging insulin list prices were inflated in a rebate scheme with pharmacy-benefit managers. It denies wrongdoing.',
          src: [S('Open Class Actions (2026)', 'https://openclassactions.com/lawsuits/insulin-pricing-mdl-lawsuit.php')] }
      ]
    },
    {
      id: 'semaglutide', name: 'Semaglutide', brands: 'Ozempic, Wegovy, Rybelsus', area: 'hormones', what: 'Type 2 diabetes and weight loss (GLP-1)',
      maker: 'Novo Nordisk', co: 'novo',
      light: 'red',
      why: 'Thousands of US lawsuits over stomach paralysis and bowel blockage, and a separate group over sudden vision loss.',
      self: { q: 'maybe', text: 'Highly effective. Stomach side effects are known; whether it causes stomach paralysis or the rare eye condition NAION is what the lawsuits dispute.' },
      events: [
        { year: 2024, issue: 'harm', status: 'open', by: 'private',
          title: 'Stomach-paralysis lawsuits',
          desc: 'Cases claiming GLP-1 drugs caused gastroparesis, ileus or bowel obstruction were grouped in a Pennsylvania federal court in February 2024, with about 3,760 cases by June 2026. In 2025 the judge ruled that gastroparesis claims need objective testing.',
          src: [S('Dechert (2025)', 'https://www.dechert.com/knowledge/re-torts/2025/9/GLP-1-MDL-Requires-Objective-Testing-to-Proceed.html/1784458482836'), S('Drug & Device Law (2025)', 'https://www.druganddevicelawblog.com/2025/08/trimming-down-the-glp-1-mdl.html')] },
        { year: 2025, issue: 'harm', status: 'open', by: 'private',
          title: 'Vision-loss lawsuits',
          desc: 'A separate group of cases over NAION, a sudden loss of vision, was set up in late 2025, with about 110 cases by mid-2026.',
          src: [S('The Rx Index tracker (2026)', 'https://therxindex.com/research/glp1-lawsuits-enforcement-tracker/')] }
      ],
      note: 'The same drug cost about US$936 a month in the US in 2023, against about US$87 in Australia: see the Ozempic chart in the Australia section.'
    },
    {
      id: 'tirzepatide', name: 'Tirzepatide', brands: 'Mounjaro, Zepbound', area: 'hormones', what: 'Type 2 diabetes and weight loss (GLP-1/GIP)',
      maker: 'Eli Lilly', co: 'lilly',
      light: 'red',
      why: 'A defendant in the US stomach-paralysis lawsuits alongside Ozempic.',
      self: { q: 'maybe', text: 'Highly effective. Stomach side effects are known; the lawsuits dispute whether it causes serious injury.' },
      events: [
        { year: 2024, issue: 'harm', status: 'open', by: 'private',
          title: 'Stomach-paralysis lawsuits',
          desc: 'Lilly’s Mounjaro and Zepbound are among the drugs in the grouped US cases claiming GLP-1 medicines caused gastroparesis or bowel obstruction.',
          src: [S('The Rx Index tracker (2026)', 'https://therxindex.com/research/glp1-lawsuits-enforcement-tracker/')] }
      ]
    },
    {
      id: 'dulaglutide', name: 'Dulaglutide', brands: 'Trulicity', area: 'hormones', what: 'Type 2 diabetes (GLP-1)',
      maker: 'Eli Lilly', co: 'lilly',
      light: 'red',
      why: 'Also a defendant in the US stomach-paralysis lawsuits.',
      self: { q: 'maybe', text: 'Effective. The lawsuits dispute whether it causes serious stomach injury.' },
      events: [
        { year: 2024, issue: 'harm', status: 'open', by: 'private',
          title: 'Stomach-paralysis lawsuits',
          desc: 'Trulicity is among the GLP-1 drugs named in the grouped US cases over gastroparesis and bowel obstruction.',
          src: [S('The Rx Index tracker (2026)', 'https://therxindex.com/research/glp1-lawsuits-enforcement-tracker/')] }
      ]
    },
    {
      id: 'liraglutide', name: 'Liraglutide', brands: 'Victoza, Saxenda', area: 'hormones', what: 'Type 2 diabetes and weight loss (GLP-1)',
      maker: 'Novo Nordisk (generics arriving)', co: 'novo',
      light: 'green',
      why: 'Sales reps allegedly played down a required thyroid-cancer warning.',
      self: { q: 'no', text: 'Not in question. A rare thyroid tumour risk seen in rodents is on the label.' },
      events: [
        { year: 2017, issue: 'spin', status: 'paid', by: 'gov', amount: '$58.65m', usd: 58.65,
          title: 'Thyroid warning downplayed',
          desc: 'Novo Nordisk settled allegations that sales reps gave doctors misleading information about the FDA-required warning on a rare thyroid cancer.',
          src: [S('US DOJ (2017)', 'https://www.justice.gov/opa/pr/novo-nordisk-agrees-pay-58-million-failure-comply-fda-mandated-risk-program')] }
      ]
    },
    {
      id: 'sitagliptin', name: 'Sitagliptin', brands: 'Januvia, Janumet', area: 'hormones', what: 'Type 2 diabetes',
      maker: 'Merck (MSD)', co: 'merck',
      light: 'amber',
      why: 'A probable carcinogen was found in 2022; the FDA let it stay on sale above the normal limit to avoid a shortage.',
      self: { q: 'factory', text: 'The medicine works; the issue was an impurity, which the FDA judged a minimal added risk.' },
      events: [
        { year: 2022, issue: 'factory', status: 'found', by: 'regulator', tag: 'Impurity',
          title: 'Nitrosamine above the limit',
          desc: 'Tests found the nitrosamine NTTP in sitagliptin products. To avoid a shortage, the FDA temporarily allowed up to 246.7 ng a day instead of 37 ng, judging the added cancer risk minimal. Merck added quality controls.',
          src: [S('Fierce Pharma (2022)', 'https://www.fiercepharma.com/manufacturing/fda-angles-avert-shortage-mercks-diabetes-med-januvia-after-testing-flags-possible'), S('BioSpace (2022)', 'https://www.biospace.com/article/merck-s-blockbuster-diabetes-drug-found-contaminated-with-potential-carcinogen/')] }
      ]
    },
    {
      id: 'pioglitazone', name: 'Pioglitazone', brands: 'Actos', area: 'hormones', what: 'Type 2 diabetes',
      maker: 'Takeda (now generic)', co: 'takeda',
      light: 'green',
      why: 'A jury found Takeda hid bladder-cancer risks; it then settled about 9,000 cases for $2.37 billion.',
      self: { q: 'known', text: 'Still used. A possible bladder-cancer risk is on the label.' },
      events: [
        { year: 2015, issue: 'harm', status: 'paid', by: 'private', amount: '$2.37bn', usd: 2370,
          title: 'Bladder-cancer lawsuits',
          desc: 'In 2014 a jury found Takeda had hidden cancer risks and awarded $9 billion in punitive damages against Takeda and Lilly, later cut to $36.8 million. Takeda then settled about 9,000 cases.',
          src: [S('Takeda (2015)', 'https://www.takeda.com/en-us/newsroom/news-releases/2015/takeda-agrees-to-settle-actos-product-liability-lawsuits-and-claims-takeda-stresses-continued-commitment-to-actos/')] }
      ]
    },
    {
      id: 'levothyroxine', name: 'Levothyroxine', brands: 'Oroxine, Eutroxsig, Synthroid', area: 'hormones', what: 'Underactive thyroid',
      maker: 'Many makers; Synthroid by Knoll (later Abbott, now AbbVie)', co: 'abbvie',
      light: 'green',
      why: 'The maker of Synthroid blocked publication of a study it had paid for, which found cheaper versions worked just as well.',
      self: { q: 'no', text: 'Not in question. Stick to one brand where possible and have levels checked after any switch.' },
      events: [
        { year: 1997, issue: 'spin', status: 'paid', by: 'private', amount: '$98m+', usd: 98, tag: 'Settled',
          title: 'A suppressed study',
          desc: 'A university study funded by Synthroid’s maker found generic and brand thyroxine interchangeable, potentially saving about $356 million a year. The company blocked publication for years; it appeared in JAMA in 1997. Knoll then agreed to pay at least $98 million to settle class actions, without admitting wrongdoing.',
          src: [S('Nature (1997)', 'https://www.nature.com/articles/41836'), S('The Pharma Letter', 'https://www.thepharmaletter.com/knoll-to-settle-synthroid-lawsuit')] }
      ]
    },
    {
      id: 'liothyronine', name: 'Liothyronine', brands: 'Tertroxin, Cytomel', area: 'hormones', what: 'Underactive thyroid (T3)',
      maker: 'Advanz Pharma (formerly Concordia) in the UK',
      light: 'green',
      why: 'The UK’s competition regulator fined its supplier for overcharging the NHS; the fine survived two appeals.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2025, issue: 'price', status: 'paid', by: 'foreign', amount: '£99m', usd: 130,
          title: 'UK: excessive pricing',
          desc: 'The CMA fined Advanz and its former owners for overcharging the NHS for liothyronine tablets. The Competition Appeal Tribunal upheld the finding in 2023 and the Court of Appeal refused a further appeal in 2025.',
          src: [S('UK Government', 'https://www.gov.uk/government/news/court-upholds-cmas-99m-fine-on-pharma-over-excessive-nhs-thyroid-drug-prices')] }
      ]
    },
    {
      id: 'hydrocortisone', name: 'Hydrocortisone tablets', brands: 'Hysone, Cortef', area: 'hormones', what: 'Adrenal insufficiency (e.g. Addison’s disease)',
      maker: 'Auden Mckenzie and Actavis UK in the UK',
      light: 'green',
      why: 'A UK pack went from under £1 to over £70; the courts upheld the regulator’s findings.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2021, issue: 'price', status: 'paid', by: 'foreign', amount: '£260m+ (all suppliers)', usd: 330,
          title: 'UK: excessive pricing',
          desc: 'The CMA found Auden Mckenzie and Actavis UK charged the NHS excessive and unfair prices over a decade: from under £1 to over £70 a pack, taking NHS spending from about £500,000 a year to over £80 million. The Court of Appeal later upheld the findings.',
          src: [S('UK Government', 'https://www.gov.uk/government/news/court-upholds-cma-findings-that-firms-charged-excessive-and-unfair-prices-for-lifesaving-nhs-funded-medicine')] }
      ]
    },
    {
      id: 'testosterone', name: 'Testosterone', brands: 'AndroGel, Testogel', area: 'hormones', what: 'Low testosterone',
      maker: 'AbbVie (AndroGel) and others', co: 'abbvie',
      light: 'green',
      why: 'Juries found AbbVie misled doctors about heart risks; a court found it filed sham lawsuits to block generics.',
      self: { q: 'known', text: 'Appropriate for proven deficiency. Marketing "low T" to ageing men was the problem.' },
      events: [
        { year: 2017, issue: 'harm', status: 'paid', by: 'private', tag: 'Settled',
          title: 'Heart-attack lawsuits',
          desc: 'Chicago juries awarded $150 million and $140 million in punitive damages, finding AbbVie misled about cardiovascular risks; both were later retried. AbbVie signed a master settlement covering existing claims in 2018.',
          src: [S('Mealey’s', 'https://www.lexislegalnews.com/mealeys/amp/articles/1628757'), S('AbbVie quarterly report (2019)', 'https://www.sec.gov/Archives/edgar/data/1551152/000155115219000023/Financial_Report.xlsx')] },
        { year: 2018, issue: 'compete', status: 'found', by: 'gov', tag: 'Found; money overturned',
          title: '"Sham" patent lawsuits',
          desc: 'A court found AbbVie filed baseless patent suits to keep generic testosterone gel off the market and ordered $448 million in relief. The appeals court upheld the wrongdoing in 2020 but struck the money.',
          src: [S('PolicyMed (2020)', 'https://policymed.com/2020/10/court-of-appeals-overturns-448-million-disgorgement-against-abbvie-revives-ftc-reverse-payment-claim.html')] }
      ]
    },
    {
      id: 'colchicine', name: 'Colchicine', brands: 'Colgout, Colcrys', area: 'hormones', what: 'Gout',
      maker: 'URL Pharma, then Takeda, in the US',
      light: 'green',
      why: 'A centuries-old remedy whose US price jumped about 50-fold when one company won exclusive rights.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2010, issue: 'price', status: 'raised', by: 'other', tag: 'Price rise',
          title: 'An old drug, a new monopoly',
          desc: 'After URL Pharma ran trials and won FDA approval for Colcrys, cheap unapproved colchicine was removed from the US market. The price rose from about $0.09 to about $5 a tablet, and a study later linked the rise to worse gout control.',
          src: [S('Fierce Pharma', 'https://www.fiercepharma.com/pharma/centuries-old-treatment-gets-a-brand-name-price'), S('BioSpace', 'https://www.biospace.com/gout-drug-colchicine-spikes-for-a-decade-after-2010-fda-policy-change')] }
      ]
    },
    // ───────────── women's and men's health ─────────────
    {
      id: 'hrt', name: 'Conjugated oestrogens', brands: 'Premarin, Prempro', area: 'women', what: 'Menopause hormone therapy',
      maker: 'Wyeth, now Pfizer', co: 'pfizer',
      light: 'green',
      why: 'Wyeth paid a medical-writing firm to draft more than 50 papers that overstated benefits and played down risks.',
      self: { q: 'known', text: 'Useful for menopause symptoms; the risks, including breast cancer, depend on type, dose and duration.' },
      events: [
        { year: 2010, during: [1997, 2003], issue: 'spin', status: 'found', by: 'other', tag: 'Documented',
          title: 'Ghostwritten science',
          desc: 'About 1,500 documents unsealed in lawsuits by more than 14,000 women with breast cancer showed Wyeth hired DesignWrite to draft more than 50 peer-reviewed papers, which promoted unproven benefits and played down risks.',
          src: [S('Fugh-Berman, PLoS Medicine (2010)', 'https://journals.plos.org/plosmedicine/article/info:doi/10.1371/journal.pmed.1000335')] }
      ]
    },
    {
      id: 'drospirenone', name: 'Drospirenone with ethinyloestradiol', brands: 'Yaz, Yasmin', area: 'women', what: 'Contraceptive pill',
      maker: 'Bayer', co: 'bayer',
      light: 'green',
      why: 'Hundreds of millions paid to settle claims it raised the risk of blood clots more than older pills.',
      self: { q: 'known', text: 'Effective. Its clot risk is somewhat higher than some older pills, as the label now says.' },
      events: [
        { year: 2012, issue: 'harm', status: 'paid', by: 'private', amount: '$402.6m', usd: 402.6,
          title: 'Blood-clot lawsuits',
          desc: 'By mid-2012 Bayer had paid about $403 million to settle roughly 1,900 lawsuits, and set aside more for thousands of others, without admitting wrongdoing.',
          src: [S('Fierce Pharma (2012)', 'https://www.fiercepharma.com/regulatory/bayer-settles-yasmin-suits-for-212k-each-402m-total')] }
      ]
    },
    {
      id: 'nuvaring', name: 'Etonogestrel vaginal ring', brands: 'NuvaRing', area: 'women', what: 'Contraception',
      maker: 'Merck (MSD)', co: 'merck',
      light: 'green',
      why: 'Settled lawsuits claiming it downplayed blood-clot risks.',
      self: { q: 'known', text: 'Effective. Clot risk is a known risk of combined hormonal contraception.' },
      events: [
        { year: 2014, issue: 'harm', status: 'paid', by: 'private', amount: '$100m', usd: 100,
          title: 'Blood-clot lawsuits',
          desc: 'Merck agreed to pay $100 million to resolve US lawsuits alleging it failed to warn of NuvaRing’s higher clot risk, denying fault.',
          src: [S('Fierce Pharma (2014)', 'https://www.fiercepharma.com/regulatory/merck-ready-to-settle-nuvaring-lawsuits-for-100m'), S('JURIST (2014)', 'https://www.jurist.org/news/2014/02/merck-agrees-to-100-million-nuvaring-settlement')] }
      ]
    },
    {
      id: 'mirena', name: 'Levonorgestrel IUD', brands: 'Mirena', area: 'women', what: 'Contraception and heavy periods',
      maker: 'Bayer', co: 'bayer',
      light: 'green',
      why: 'Two waves of injury lawsuits were thrown out for lack of evidence.',
      self: { q: 'no', text: 'Not in question. Perforation is a rare, known risk of any IUD.' },
      events: [
        { year: 2016, issue: 'harm', status: 'dismissed', by: 'private',
          title: 'Perforation lawsuits thrown out',
          desc: 'About 1,300 federal cases claiming the device moved and perforated the uterus were dismissed after the judge rejected the plaintiffs’ experts; the appeals court affirmed. Bayer later reportedly paid $12.2 million to settle remaining claims.',
          src: [S('Court opinion (2016)', 'https://cite.case.law/f-supp-3d/341/213/'), S('Drugwatch', 'https://www.drugwatch.com/mirena/lawsuits/')] },
        { year: 2019, issue: 'harm', status: 'dismissed', by: 'private',
          title: 'Brain-pressure lawsuits thrown out',
          desc: 'A separate group of cases claiming Mirena caused raised pressure in the skull was dismissed because the plaintiffs could not prove it was the cause.',
          src: [S('Court opinion (2019)', 'https://cite.case.law/f-supp-3d/387/323/')] }
      ]
    },
    {
      id: 'depo-provera', name: 'Medroxyprogesterone injection', brands: 'Depo-Provera, Depo-Ralovera', area: 'women', what: 'Contraceptive injection',
      maker: 'Pfizer', co: 'pfizer',
      light: 'red',
      why: 'Thousands of US lawsuits claim long-term use causes meningioma, a brain tumour; the first trial is set for December 2026.',
      self: { q: 'maybe', text: 'An effective contraceptive. The lawsuits claim a higher risk of meningioma, usually a non-cancerous tumour, with long-term use; Pfizer disputes them. Talk to your doctor before stopping.' },
      events: [
        { year: 2025, issue: 'harm', status: 'open', by: 'private',
          title: 'Brain-tumour lawsuits',
          desc: 'About 3,500 or more cases were grouped in a Florida federal court in 2025. Pfizer has argued US regulators would not have allowed a warning; Daubert hearings were held in mid-2026 and the first bellwether trial is scheduled for 7 December 2026.',
          src: [S('US District Court, N.D. Fla.', 'https://flnd.uscourts.gov/node/1421'), S('Anapol Weiss (2026)', 'https://blog.anapolweiss.com/blog/the-depo-provera-mdl-where-things-stand/')] }
      ]
    },
    {
      id: 'finasteride', name: 'Finasteride', brands: 'Propecia, Proscar', area: 'women', what: 'Hair loss and enlarged prostate',
      maker: 'Merck (MSD) (now generic)', co: 'merck',
      light: 'amber',
      why: 'Documents showed Merck knew of hundreds of depression reports, including suicidal thoughts, years before warnings caught up.',
      self: { q: 'maybe', text: 'Effective. Sexual side effects and depression are reported; whether some persist after stopping, and the suicide link, are disputed.' },
      events: [
        { year: 2019, issue: 'harm', status: 'paid', by: 'private', tag: 'Mostly settled',
          title: 'Sexual side-effect lawsuits',
          desc: 'Lawsuits claimed Propecia caused lasting sexual dysfunction. Most plaintiffs accepted settlements; court records unsealed after Reuters intervened showed what Merck knew.',
          src: [S('Insurance Journal (2019)', 'https://www.insurancejournal.com/news/national/2019/09/12/539585.htm')] },
        { year: 2021, issue: 'harm', status: 'raised', by: 'other', tag: 'Reported',
          title: 'Suicide reports and a slow label',
          desc: 'Reuters reported that by 2009 Merck knew of more than 200 reports of depression, some with suicidal thoughts, and that an FDA reviewer’s 2010 call for a suicide warning was overruled. Merck says the evidence does not support a causal link.',
          src: [S('Public Citizen', 'https://www.citizen.org/article/outrage-of-the-month-merck-fda-failed-to-warn-consumers-about-potential-suicide-risk-linked-to-anti-baldness-drug/')] }
      ]
    },
    // ───────────── bones ─────────────
    {
      id: 'alendronate', name: 'Alendronate', brands: 'Fosamax', area: 'bones', what: 'Osteoporosis',
      maker: 'Merck (MSD) (now generic)', co: 'merck',
      light: 'red',
      why: 'Lawsuits over unusual thigh-bone fractures have bounced between courts, including the US Supreme Court, for more than a decade.',
      self: { q: 'known', text: 'Effective at preventing fractures. Rare unusual thigh-bone fractures with long-term use are now on the label.' },
      events: [
        { year: 2019, issue: 'harm', status: 'open', by: 'private',
          title: 'Thigh-fracture lawsuits',
          desc: 'Many claims say Merck failed to warn about atypical femur fractures. In 2019 the US Supreme Court ruled judges, not juries, decide whether federal law blocks such claims. A judge then found them blocked, but in 2024 the appeals court sent the cases back again.',
          src: [S('Supreme Court opinion (2019)', 'https://www.law.cornell.edu/supremecourt/text/17-290'), S('Fishman Haygood (2024)', 'https://www.fishmanhaygood.com/resources/fosamax-cases-allowed-to-proceed-herman-examines-u-s-third-circuits-rejection-of-mercks-preemption-claims/')] }
      ]
    },
    {
      id: 'risedronate', name: 'Risedronate', brands: 'Actonel, Atelvia', area: 'bones', what: 'Osteoporosis',
      maker: 'Warner Chilcott (later Allergan, now AbbVie)', co: 'abbvie',
      light: 'green',
      why: 'Its US seller pleaded guilty to health-care fraud after paying doctors and faking prior-authorisation paperwork.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2015, during: [2009, 2013], issue: 'fraud', status: 'paid', by: 'gov', amount: '$125m', usd: 125, crim: true,
          title: 'Guilty plea: kickbacks and false paperwork',
          desc: 'Warner Chilcott paid doctors through sham speaker events and meals and coached them to justify prior-authorisation requests for patients who did not qualify, for Actonel, Asacol and five other drugs.',
          src: [S('PharmExec (2015)', 'https://www.pharmexec.com/view/warner-chilcott-pay-125-million-resolve-physician-kickback-allegations'), S('Healthcare Finance (2015)', 'https://www.healthcarefinancenews.com/news/warner-chilcott-pay-125-million-over-kickback-scheme-former-drug-company-officials-indicted')] }
      ]
    },
    // ───────────── breathing ─────────────
    {
      id: 'seretide', name: 'Fluticasone with salmeterol', brands: 'Seretide, Advair', area: 'breathing', what: 'Asthma and COPD (preventer)',
      maker: 'GlaxoSmithKline', co: 'gsk',
      light: 'green',
      why: 'Promoted as a first-line asthma treatment for patients who did not need it, as part of GSK’s $3 billion case.',
      self: { q: 'no', text: 'Not in question for the patients it suits.' },
      events: [
        { year: 2012, issue: 'fraud', status: 'paid', by: 'gov', amount: 'part of $3bn',
          title: 'Off-label promotion',
          desc: 'GSK’s civil settlement resolved claims that it promoted Advair for unapproved uses, including first-line use for mild asthma, and paid doctors to prescribe it.',
          src: [S('US DOJ (2012)', 'https://www.justice.gov/opa/pr/2012/July/12-civ-842.html')] }
      ]
    },
    {
      id: 'fluticasone', name: 'Fluticasone inhaler', brands: 'Flixotide, Flovent', area: 'breathing', what: 'Asthma (preventer)',
      maker: 'GlaxoSmithKline', co: 'gsk',
      light: 'red',
      why: 'GSK withdrew brand-name Flovent in the US the day a Medicaid rebate cap ended, replacing it with an "authorised generic"; Arizona is suing.',
      self: { q: 'no', text: 'Not in question. Families reported trouble getting it covered after the switch.' },
      events: [
        { year: 2024, issue: 'price', status: 'raised', by: 'other', tag: 'Criticised',
          title: 'Pulled to dodge rebates?',
          desc: 'GSK stopped selling Flovent and launched an authorised generic just as a US cap on Medicaid rebates was removed. Johns Hopkins researchers estimated the move cost state Medicaid programs nearly $1 billion in 2024. GSK called it a business decision to preserve access.',
          src: [S('Senator Warren (2024)', 'https://www.warren.senate.gov/newsroom/press-releases/warren-slams-inhaler-manufacturer-gsk-for-its-billion-dollar-drug-price-gouging-scheme-harming-millions-of-children'), S('Fierce Pharma', 'https://www.fiercepharma.com/pharma/sen-warren-rebukes-gsk-alleged-price-gouging-after-pulling-popular-childrens-asthma-med')] },
        { year: 2025, issue: 'price', status: 'open', by: 'gov',
          title: 'Arizona consumer-fraud lawsuit',
          desc: 'Arizona’s attorney general sued, alleging GSK switched to the authorised generic to avoid paying Medicaid rebates.',
          src: [S('Arizona AG complaint (2025)', 'https://www.azag.gov/sites/default/files/2025-06/GlaxoSmithKline%2Baka%2BFlovent%2BComplaint.pdf')] }
      ]
    },
    {
      id: 'montelukast', name: 'Montelukast', brands: 'Singulair', area: 'breathing', what: 'Asthma and hay fever',
      maker: 'Merck, now Organon (now generic)', co: 'merck',
      light: 'amber',
      why: 'A boxed warning about suicidal thoughts and behaviour was added in 2020; lawsuits say it came far too late.',
      self: { q: 'known', text: 'Effective, but mood and behaviour changes, including suicidal thoughts, are a boxed warning. Watch for them, especially in children.' },
      events: [
        { year: 2020, issue: 'harm', status: 'found', by: 'regulator', tag: 'Boxed warning',
          title: 'A boxed warning, 22 years on',
          desc: 'The FDA required its strongest warning about serious neuropsychiatric events, including suicidal thoughts and actions, and advised against using it for mild allergies.',
          src: [S('NewsNation', 'https://digital-release.newsnationnow.com/?p=2584330')] },
        { year: 2024, issue: 'harm', status: 'raised', by: 'private', tag: 'Mixed rulings',
          title: 'Injury lawsuits',
          desc: 'Families have sued Merck and Organon claiming inadequate warnings. Courts have split: some claims were thrown out as pre-empted by federal law, one was allowed to proceed, and Merck won another on summary judgment.',
          src: [S('HarrisMartin', 'https://www.harrismartin.com/publications/4/drugs/articles/29699/merck-organon-must-face-warning-warranty-claims-in-calif-federal-singulair-action/'), S('HarrisMartin', 'https://harrismartin.com/publications/4/drugs/articles/37227/merck-prevails-in-calif-federal-singulair-neuropsychiatric-injury-action/')] }
      ]
    },
    // ───────────── stomach & gut ─────────────
    {
      id: 'omeprazole', name: 'Omeprazole', brands: 'Losec, Prilosec', area: 'gut', what: 'Reflux and ulcers (proton pump inhibitor)',
      maker: 'AstraZeneca (now generic)', co: 'astrazeneca',
      light: 'green',
      why: 'An EU fine for misleading patent offices to block generics, and a share of the $425 million kidney settlement.',
      self: { q: 'no', text: 'Not in question. Long-term use should be reviewed with your doctor.' },
      events: [
        { year: 2005, issue: 'compete', status: 'paid', by: 'foreign', amount: '€52.5m', usd: 65,
          title: 'EU: misleading patent offices',
          desc: 'The European Commission found AstraZeneca gave patent offices "deliberately misleading" information to extend Losec’s protection and withdrew products to block generics. Upheld by the EU Court of Justice in 2012.',
          src: [S('BioPharm International', 'https://www.biopharminternational.com/view/eu-court-dismisses-astrazeneca-appeal')] },
        { year: 2023, issue: 'harm', status: 'paid', by: 'private', amount: 'part of $425m',
          title: 'Kidney-injury lawsuits',
          desc: 'AstraZeneca paid $425 million to settle US lawsuits claiming Prilosec and Nexium caused kidney disease, saying the claims lacked merit.',
          src: [S('Bloomberg via BNN (2023)', 'https://www.bnnbloomberg.ca/astrazeneca-pays-425-million-to-settle-nexium-prilosec-cases-1.1979445')] }
      ]
    },
    {
      id: 'lansoprazole', name: 'Lansoprazole', brands: 'Zoton, Prevacid', area: 'gut', what: 'Reflux and ulcers (proton pump inhibitor)',
      maker: 'Takeda (now generic)', co: 'takeda',
      light: 'green',
      why: 'More than 6,100 US kidney-injury lawsuits, settled confidentially in 2024.',
      self: { q: 'no', text: 'Not in question. Long-term use should be reviewed with your doctor.' },
      events: [
        { year: 2024, issue: 'harm', status: 'paid', by: 'private', tag: 'Settled',
          title: 'Kidney-injury lawsuits',
          desc: 'Takeda faced more than 6,100 US lawsuits claiming Prevacid and Dexilant caused kidney injury, and settled them in 2024 for an undisclosed amount it called not material.',
          src: [S('Takeda report to the SEC (2025)', 'https://www.sec.gov/Archives/edgar/data/1395064/000139506425000048/form6k-1_050825.htm')] }
      ]
    },
    {
      id: 'ondansetron', name: 'Ondansetron', brands: 'Zofran', area: 'gut', what: 'Nausea and vomiting',
      maker: 'GlaxoSmithKline (now generic)', co: 'gsk',
      light: 'green',
      why: 'Promoted for morning sickness without approval; birth-defect lawsuits were later thrown out.',
      self: { q: 'no', text: 'Not in question. Use in pregnancy is a decision for you and your doctor.' },
      events: [
        { year: 2012, issue: 'fraud', status: 'paid', by: 'gov', amount: 'part of $3bn',
          title: 'Off-label promotion',
          desc: 'GSK’s civil settlement resolved claims that it promoted Zofran for unapproved uses, including pregnancy nausea.',
          src: [S('US DOJ (2012)', 'https://www.justice.gov/opa/pr/2012/July/12-civ-842.html')] },
        { year: 2023, issue: 'harm', status: 'dismissed', by: 'private',
          title: 'Birth-defect lawsuits thrown out',
          desc: 'A judge ruled the claims were pre-empted because the FDA, fully informed, had rejected the proposed birth-defect warning; the appeals court agreed in 2023.',
          src: [S('American Bar Association (2023)', 'https://www.americanbar.org/groups/litigation/resources/newsletters/mass-torts/first-circuit-upholds-preemption-zofran-mdl/')] }
      ]
    },
    {
      id: 'mesalazine', name: 'Mesalazine', brands: 'Asacol, Mesasal, Salofalk', area: 'gut', what: 'Ulcerative colitis',
      maker: 'Asacol: Warner Chilcott (later Allergan, now AbbVie)', co: 'abbvie',
      light: 'green',
      why: 'Asacol was one of seven drugs in Warner Chilcott’s 2015 health-care fraud guilty plea.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2015, during: [2009, 2013], issue: 'fraud', status: 'paid', by: 'gov', amount: 'part of $125m', crim: true,
          title: 'Guilty plea: kickbacks',
          desc: 'Warner Chilcott pleaded guilty to health-care fraud over kickbacks and false prior-authorisation paperwork covering Asacol, Actonel and five other drugs.',
          src: [S('PharmExec (2015)', 'https://www.pharmexec.com/view/warner-chilcott-pay-125-million-resolve-physician-kickback-allegations')] }
      ]
    },
    // ───────────── infections ─────────────
    {
      id: 'ciprofloxacin', name: 'Ciprofloxacin', brands: 'Ciproxin, Cipro', area: 'infection', what: 'Bacterial infections (antibiotic)',
      maker: 'Bayer (now generic)', co: 'bayer',
      light: 'green',
      why: 'Bayer paid a generic maker $398 million to stay off the market, and hid a discount from Medicaid.',
      self: { q: 'known', text: 'Effective, but tendon, nerve and other serious side effects carry boxed warnings; it is now reserved for when other antibiotics will not do.' },
      events: [
        { year: 2003, issue: 'fraud', status: 'paid', by: 'gov', amount: '$257m', usd: 257, crim: true,
          title: 'Hiding a discount from Medicaid',
          desc: 'Bayer pleaded guilty. It sold "private label" Cipro and Adalat to the insurer Kaiser cheaply and did not report it as its best price, short-changing Medicaid rebates.',
          src: [S('Bayer report to the SEC (2003)', 'https://www.sec.gov/Archives/edgar/data/0001144145/000115697303001761/f00655e6vk.txt')] },
        { year: 2015, issue: 'compete', status: 'paid', by: 'private', amount: '$399m', usd: 399,
          title: 'Paying a rival to wait',
          desc: 'In a 1997 deal Bayer paid Barr about $398 million to hold off its generic Cipro until the patent expired. California buyers sued; Bayer settled for $74 million and Barr later for $225 million, after the state’s Supreme Court revived the case in 2015.',
          src: [S('Lieff Cabraser', 'https://lieffcabraser.com/Antitrust/Cipro'), S('Crowell & Moring (2015)', 'https://crowell.com/en/insights/client-alerts/ca-supreme-court-fashions-structural-rule-of-reason-analysis-for-pay-for-delay-settlement-agreements')] }
      ]
    },
    {
      id: 'levofloxacin', name: 'Levofloxacin', brands: 'Levaquin, Tavanic', area: 'infection', what: 'Bacterial infections (antibiotic)',
      maker: 'Janssen (J&J) (now generic)', co: 'jnj',
      light: 'green',
      why: 'Thousands of tendon-rupture lawsuits; J&J lost the first trial and won others.',
      self: { q: 'known', text: 'Effective, but tendon rupture and other serious side effects carry boxed warnings.' },
      events: [
        { year: 2010, issue: 'harm', status: 'paid', by: 'private', amount: '$1.8m', usd: 1.8,
          title: 'Tendon-rupture lawsuits',
          desc: 'A Minneapolis federal jury awarded $1.8 million to a man whose Achilles tendons ruptured after a short course. J&J went on to win other trials among thousands of cases.',
          src: [S('PharmaTimes', 'https://pharmatimes.com/?p=51569')] }
      ]
    },
    {
      id: 'oseltamivir', name: 'Oseltamivir', brands: 'Tamiflu', area: 'infection', what: 'Influenza (antiviral)',
      maker: 'Roche', co: 'roche',
      light: 'green',
      why: 'Governments stockpiled it for years before Roche released the full trial data, which showed weaker benefits than claimed.',
      self: { q: 'known', text: 'Shortens flu symptoms by about half a day; evidence that it prevents complications is weak.' },
      events: [
        { year: 2014, issue: 'spin', status: 'found', by: 'other', tag: 'Data released',
          title: 'The missing trial data',
          desc: 'After a campaign of more than four years by Cochrane and the BMJ, Roche released all 77 clinical study reports. The review found no good evidence that Tamiflu reduces hospital admissions or complications. The UK alone had spent about £424 million on stockpiles.',
          src: [S('Scientific American (2014)', 'https://www.scientificamerican.com/article/flu-drug-stockpiling-reported-to-be-a-waste-of-money/'), S('Goldacre / CEBM', 'https://www.cebm.net/announcement/ben-goldacre-tamiflu-saga-tells-us-drug-trials-big-pharma/')] }
      ]
    },
    {
      id: 'truvada', name: 'Tenofovir disoproxil with emtricitabine', short: 'Truvada (TDF)', brands: 'Truvada', area: 'infection', what: 'HIV treatment and prevention (PrEP)',
      maker: 'Gilead (now generic)', co: 'gilead',
      light: 'green',
      why: 'Thousands of patients claimed Gilead held back a kidney- and bone-friendlier version to protect sales; California’s Supreme Court threw out the claims in 2026.',
      self: { q: 'known', text: 'Effective. Kidney and bone effects are known; newer TAF versions have less of them.' },
      events: [
        { year: 2026, issue: 'harm', status: 'dismissed', by: 'private', tag: 'Thrown out',
          title: 'The "delayed safer drug" lawsuits',
          desc: 'More than 20,000 plaintiffs alleged Gilead slowed development of its TAF-based drugs to keep selling TDF. A lower court let the claims proceed in 2024, but in August 2026 California’s Supreme Court ruled 6–1 that drugmakers have no general duty to bring an alternative drug to market sooner.',
          src: [S('Court opinion via Leagle (2026)', 'https://www.leagle.com/decision/incaco20260803034'), S('BioSpace', 'https://www.biospace.com/gilead-lawsuits-california-hiv-patients-file-class-action-and-personal-injury-cases-over-key-hiv-drug')] }
      ]
    },
    {
      id: 'biktarvy', name: 'Bictegravir, emtricitabine and tenofovir alafenamide', short: 'Biktarvy', brands: 'Biktarvy', area: 'infection', what: 'HIV treatment',
      maker: 'Gilead', co: 'gilead',
      light: 'green',
      why: 'Gilead paid $202 million over speaker programmes that allegedly rewarded doctors for prescribing its HIV drugs.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2025, during: [2011, 2017], issue: 'fraud', status: 'paid', by: 'gov', amount: '$202m', usd: 202,
          title: 'Speaker-programme kickbacks',
          desc: 'Gilead settled whistleblower claims that lavish speaker events and fees, including more than $20 million in speaker fees, induced doctors to prescribe Biktarvy, Descovy and other HIV drugs.',
          src: [S('CNBC via NBC (2025)', 'https://www.nbcwashington.com/news/business/money-report/gilead-sciences-agrees-to-pay-202-million-to-settle-claims-of-kickbacks-to-doctors-for-hiv-drug-prescriptions/3902230/')] }
      ]
    },
    {
      id: 'sofosbuvir', name: 'Sofosbuvir', brands: 'Sovaldi, Harvoni, Epclusa', area: 'infection', what: 'Hepatitis C cure',
      maker: 'Gilead', co: 'gilead',
      light: 'green',
      why: 'A genuine cure priced at about $1,000 a pill "to maximise revenue", a Senate investigation found.',
      self: { q: 'no', text: 'Not in question. It cures most people with hepatitis C.' },
      events: [
        { year: 2015, issue: 'price', status: 'found', by: 'gov', tag: 'Senate finding',
          title: '$84,000 a course',
          desc: 'An 18-month Senate Finance Committee investigation found Gilead set the price to maximise revenue, and that broad, affordable access was not a key consideration. Medicare spent $8.2 billion on Sovaldi and Harvoni in 18 months.',
          src: [S('US Senate Finance Committee (2015)', 'https://www.finance.senate.gov/ranking-members-news/wyden-grassley-sovaldi-investigation-finds-revenue-driven-pricing-strategy-behind-84-000-hepatitis-drug')] }
      ],
    },
    {
      id: 'doxycycline', name: 'Doxycycline', brands: 'Doryx, Vibramycin', area: 'infection', what: 'Bacterial infections, acne and malaria prevention',
      maker: 'Generic makers including Heritage Pharmaceuticals',
      light: 'green',
      why: 'Generic makers’ executives pleaded guilty to fixing its price, the first charges in the US generic price-fixing probe.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2017, during: [2013, 2015], issue: 'price', status: 'paid', by: 'gov', amount: '$7.3m', usd: 7.3, crim: true,
          title: 'Price-fixing guilty pleas',
          desc: 'Heritage’s former chief executive and president pleaded guilty to conspiring to fix the prices of doxycycline hyclate and the diabetes drug glyburide. Heritage entered a deferred prosecution agreement and paid $7.1 million in a civil settlement.',
          src: [S('AJMC', 'https://ajmc.com/view/drug-price-fixing-charges-result-from-investigation-of-generic-drug-industry'), S('Connecticut AG (2017)', 'https://portal.ct.gov/AG/Press-Releases-Archived/2017-Press-Releases/AG-Jepsen-States-Reach-Settlements-Cooperation-Agreements-with-Two-Former-Executives-in-Generic-Drug')] }
      ]
    },
    // ───────────── immune system & MS ─────────────
    {
      id: 'adalimumab', name: 'Adalimumab', brands: 'Humira, Hadlima, Amgevita', area: 'immune', what: 'Arthritis, psoriasis and Crohn’s disease',
      maker: 'AbbVie (biosimilars now available)', co: 'abbvie',
      light: 'green',
      why: 'A 132-patent wall kept US copies out until 2023, while the price rose about 470%.',
      self: { q: 'no', text: 'Not in question. Cheaper biosimilars work the same way.' },
      events: [
        { year: 2020, issue: 'fraud', status: 'paid', by: 'gov', amount: '$24m', usd: 24,
          title: 'Free "nurse ambassadors"',
          desc: 'A whistleblower case claimed AbbVie gave doctors free nurse services and other perks to drive Humira prescriptions. Settled with California’s Insurance Commissioner without admitting wrongdoing.',
          src: [S('California Dept of Insurance (2020)', 'https://www.insurance.ca.gov/0400-news/0100-press-releases/2020/release071-2020.cfm')] },
        { year: 2021, issue: 'compete', status: 'raised', by: 'gov', tag: 'Congressional finding',
          title: 'Patents, price and tax',
          desc: 'Congressional investigators found Humira’s US list price rose about 470% and executive bonuses were tied to Humira revenue. AbbVie’s 132-patent "thicket" kept US biosimilars out until 2023, five years after Europe; courts found this legal.',
          src: [S('Endpoints', 'https://endpts.com/house-committee-uncovers-how-humiras-price-spiked-by-470-as-abbvie-execs-cashed-bonuses-tied-to-the-hikes'), S('Petrie-Flom', 'https://petrieflom.law.harvard.edu/2021/01/06/abbvie-humira-antitrust-patent-thicket/')] }
      ]
    },
    {
      id: 'etanercept', name: 'Etanercept', brands: 'Enbrel, Brenzys', area: 'immune', what: 'Arthritis and psoriasis',
      maker: 'Amgen in the US; Pfizer elsewhere', co: 'amgen',
      light: 'amber',
      why: 'Patents bought from another company keep US copies out until 2029; a rival is suing.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2020, issue: 'compete', status: 'raised', by: 'private', tag: 'Patents upheld',
          title: 'A patent wall to 2029',
          desc: 'An appeals court upheld two Amgen patents running to 2028 and 2029, blocking Sandoz’s approved biosimilar. Sandoz argued Amgen had acquired the patents from Roche to stretch protection.',
          src: [S('Bloomberg Law (2020)', 'https://news.bloomberglaw.com/ip-law/amgen-wins-appeals-court-ruling-upholding-patents-on-enbrel-1')] },
        { year: 2025, issue: 'compete', status: 'raised', by: 'private', tag: 'Suit filed',
          title: 'Sandoz antitrust suit',
          desc: 'Sandoz sued Amgen in Virginia, alleging it extended its monopoly by buying and using patent rights, and seeking triple damages.',
          src: [S('Pharmaceutical Technology (2025)', 'https://www.pharmaceutical-technology.com/newsletters/sandoz-challenges-amgens-enbrel-patents-in-us-antitrust-lawsuit/')] }
      ]
    },
    {
      id: 'infliximab', name: 'Infliximab', brands: 'Remicade, Inflectra, Renflexis', area: 'immune', what: 'Crohn’s disease, colitis and arthritis',
      maker: 'Janssen (J&J) (biosimilars now available)', co: 'jnj',
      light: 'green',
      why: 'Pfizer accused J&J of using rebate deals to lock out its cheaper biosimilar; they settled confidentially.',
      self: { q: 'no', text: 'Not in question. Biosimilars work the same way.' },
      events: [
        { year: 2021, issue: 'compete', status: 'raised', by: 'private', tag: 'Settled',
          title: 'Locking out a cheaper copy',
          desc: 'Pfizer sued in 2017, alleging J&J tied Remicade discounts to insurers and providers shunning biosimilars such as Inflectra. The case settled confidentially in 2021, without a ruling.',
          src: [S('Fierce Pharma (2021)', 'https://www.fiercepharma.com/pharma/pfizer-johnson-johnson-agree-to-a-settlement-terms-undisclosed-biosimilar-lawsuit'), S('Goodwin (2021)', 'https://goodwinlaw.com/en/insights/blogs/2021/08/jj-and-pfizer-settle-remicade-biosimilar-antitrust')] }
      ]
    },
    {
      id: 'glatiramer', name: 'Glatiramer', brands: 'Copaxone', area: 'immune', what: 'Multiple sclerosis',
      maker: 'Teva', co: 'teva',
      light: 'green',
      why: 'Teva funnelled money through charities to cover patients’ copays while repeatedly raising the price.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2024, issue: 'fraud', status: 'paid', by: 'gov', amount: '$450m', usd: 450,
          title: 'Copay kickbacks and price-fixing',
          desc: 'Teva allegedly paid Medicare patients’ Copaxone copays through charities while raising its price. The settlement also covered generic price-fixing claims.',
          src: [S('HHS-OIG (2024)', 'https://oig.hhs.gov/fraud/enforcement/drug-maker-teva-pharmaceuticals-agrees-to-pay-450m-in-false-claims-act-settlement-to-resolve-kickback-allegations-relating-to-copayments-and-price-fixing')] }
      ]
    },
    {
      id: 'dimethyl-fumarate', name: 'Dimethyl fumarate', brands: 'Tecfidera', area: 'immune', what: 'Multiple sclerosis',
      maker: 'Biogen (now generic)',
      light: 'green',
      why: 'One of three Biogen MS drugs in a $900 million kickback settlement brought by a whistleblower.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2022, during: [2009, 2014], issue: 'fraud', status: 'paid', by: 'gov', amount: '$900m', usd: 900,
          title: 'Speaker and consulting kickbacks',
          desc: 'Biogen settled claims that it paid doctors speaker and consulting fees to prescribe Avonex, Tysabri and Tecfidera, without admitting liability. The whistleblower pursued the case after the government declined to join.',
          src: [S('BioPharm International (2022)', 'https://www.biopharminternational.com/view/biogen-to-settle-kickbacks-lawsuit-for-900-million'), S('Reuters via PharmaLive', 'https://www.pharmalive.com/biogen-finalizes-900-mln-drug-kickback-settlement-u-s-says/')] }
      ]
    },
    // ───────────── cancer & blood ─────────────
    {
      id: 'lenalidomide', name: 'Lenalidomide', brands: 'Revlimid', area: 'cancer', what: 'Multiple myeloma',
      maker: 'Celgene, now Bristol Myers Squibb', co: 'bms',
      light: 'red',
      why: 'Patent deals capped how much generic Revlimid could be sold until 2026; a court let antitrust claims go ahead in September 2026.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2017, issue: 'fraud', status: 'paid', by: 'gov', amount: '$280m', usd: 280,
          title: 'Off-label promotion',
          desc: 'Celgene settled a whistleblower case alleging off-label cancer promotion of Revlimid and Thalomid and payments to doctors, denying wrongdoing.',
          src: [S('Pharma Manufacturing (2017)', 'https://www.pharmamanufacturing.com/industrynews/2017/celgene-settles-cancer-med-fraud-suit-for-280-million/')] },
        { year: 2026, issue: 'compete', status: 'open', by: 'private', tag: 'Allowed to proceed',
          title: 'Generic volume limits',
          desc: 'Under patent settlements, generic makers could sell only a small, slowly rising share of Revlimid’s volume until January 2026. Buyers allege a conspiracy to monopolise; in September 2026 a New Jersey judge refused to dismiss the claims against Celgene, Teva and others.',
          src: [S('MLex (2026)', 'https://www.mlex.com/mlex/antitrust/articles/2531685/celgene-teva-others-must-face-us-antitrust-claims-over-revlimid-judge-rules'), S('Teva quarterly report (2026)', 'https://www.sec.gov/Archives/edgar/data/0000818686/000119312526191513/d115083d10q.htm')] }
      ]
    },
    {
      id: 'imatinib', name: 'Imatinib', brands: 'Glivec, Gleevec', area: 'cancer', what: 'Leukaemia (CML) and GIST',
      maker: 'Novartis (now generic)', co: 'novartis',
      light: 'green',
      why: 'India’s Supreme Court refused Novartis a patent on a new form of the drug, calling it an attempt to extend protection without a real improvement.',
      self: { q: 'no', text: 'Not in question. A landmark targeted cancer drug.' },
      events: [
        { year: 2013, issue: 'compete', status: 'found', by: 'foreign', tag: 'Patent refused',
          title: 'India: "evergreening" rejected',
          desc: 'The Supreme Court of India upheld the rejection of a patent on a crystalline form of imatinib, finding Novartis had not shown it worked better than the known substance. Cheap generics continued in India.',
          src: [S('PharmaTimes (2013)', 'https://pharmatimes.com/news/novartis_loses_indian_glivec_patent_case_1004741/'), S('Penningtons (2013)', 'https://www.penningtonslaw.com/news-publications/latest-news/2013/supreme-court-rules-against-novartis-in-glivec-patent-case')] }
      ]
    },
    {
      id: 'ranibizumab', name: 'Ranibizumab', brands: 'Lucentis', area: 'cancer', what: 'Macular degeneration (eye injections)',
      maker: 'Genentech/Roche and Novartis', co: 'novartis',
      light: 'green',
      why: 'Italy fined Roche and Novartis for colluding to steer doctors from cheap Avastin to Lucentis, which cost up to 30 times more.',
      self: { q: 'no', text: 'Not in question. Avastin used off-label is a far cheaper alternative many eye doctors use.' },
      events: [
        { year: 2014, issue: 'compete', status: 'paid', by: 'foreign', amount: '€180m', usd: 252,
          title: 'Italy: Avastin/Lucentis collusion',
          desc: 'Italy’s competition authority found Roche and Novartis colluded to steer eye doctors away from Avastin. Upheld after the EU Court of Justice ruled in 2018.',
          src: [S('Healio (2014)', 'https://www.healio.com/news/ophthalmology/20140305/italian-agency-fines-novartis-roche-180-million-euros-for-manipulation-of-pharmaceutical-market')] },
        { year: 2023, issue: 'compete', status: 'dismissed', by: 'foreign', tag: 'Overturned',
          title: 'France: fine overturned',
          desc: 'France fined Novartis, Roche and Genentech €444 million in 2020 for similar conduct, but the Paris Court of Appeal annulled it in 2023.',
          src: [S('Pharmaphorum (2023)', 'https://pharmaphorum.com/news/french-court-overturns-eu444m-fine-novartis-roche')] }
      ]
    },
    {
      id: 'docetaxel', name: 'Docetaxel', brands: 'Taxotere', area: 'cancer', what: 'Breast, prostate and lung cancer (chemotherapy)',
      maker: 'Sanofi (now generic)', co: 'sanofi',
      light: 'red',
      why: 'More than 10,000 women sued over permanent hair loss; Sanofi has won the trials so far, and eye-injury cases continue.',
      self: { q: 'known', text: 'An important chemotherapy. Permanent hair loss and tear-duct damage are now recognised risks.' },
      events: [
        { year: 2021, issue: 'harm', status: 'dismissed', by: 'private', tag: 'Sanofi won trials',
          title: 'Permanent hair-loss lawsuits',
          desc: 'Thousands of cases claimed Sanofi failed to warn of permanent hair loss. Juries cleared Sanofi in 2019 and 2021, thousands of cases were dismissed, and there has been no global settlement.',
          src: [S('FDAnews', 'https://fdanews.com/articles/192908-jury-clears-sanofi-of-liability-for-hair-loss-from-taxotere-therapy'), S('Drugwatch (2026)', 'https://www.drugwatch.com/taxotere/lawsuits/')] },
        { year: 2022, issue: 'harm', status: 'open', by: 'private',
          title: 'Eye-injury lawsuits',
          desc: 'A separate group of cases claims docetaxel caused chronic tearing and blocked tear ducts. In 2026 some generic makers won, while cases against Sanofi continued.',
          src: [S('Open Class Actions', 'https://openclassactions.com/investigations/taxotere-eye-injury-mdl-lawsuit.php')] }
      ]
    },
    {
      id: 'darbepoetin', name: 'Epoetin and darbepoetin', brands: 'Aranesp, Eprex', area: 'cancer', what: 'Anaemia from kidney disease or chemotherapy',
      maker: 'Amgen and Janssen (J&J)', co: 'amgen',
      light: 'green',
      why: 'Amgen pleaded guilty to promoting higher doses than approved; aiming for normal blood counts later proved dangerous.',
      self: { q: 'known', text: 'Useful, but targeting high haemoglobin raises the risk of strokes, clots and death.' },
      events: [
        { year: 2012, issue: 'fraud', status: 'paid', by: 'gov', amount: '$762m', usd: 762, crim: true, bench: 'surr',
          title: 'Guilty plea: off-label doses',
          desc: 'Amgen pleaded guilty. It had promoted Aranesp at higher doses than the label allowed, and for cancer patients not on chemotherapy, uses that later proved dangerous.',
          src: [S('BioPharm International (2012)', 'https://www.biopharminternational.com/view/amgen-pay-762-million-settlement')] }
      ]
    },
    {
      id: 'erlotinib', name: 'Erlotinib', brands: 'Tarceva', area: 'cancer', what: 'Lung cancer',
      maker: 'Genentech (Roche) and OSI (now generic)', co: 'roche',
      light: 'green',
      why: 'Told doctors it worked in patients for whom there was little evidence.',
      self: { q: 'no', text: 'Not in question for patients with an EGFR mutation.' },
      events: [
        { year: 2016, issue: 'spin', status: 'paid', by: 'gov', amount: '$67m', usd: 67,
          title: 'Misleading efficacy claims',
          desc: 'Genentech and OSI allegedly told doctors Tarceva worked for lung-cancer patients who had smoked or lacked an EGFR mutation, with little evidence.',
          src: [S('US DOJ (2016)', 'https://www.justice.gov/opa/pr/pharmaceutical-companies-pay-67-million-resolve-false-claims-act-allegations-relating-tarceva')] }
      ]
    },
    // ───────────── other ─────────────
    {
      id: 'epipen', name: 'Adrenaline auto-injector', brands: 'EpiPen', area: 'other', what: 'Severe allergic reactions (anaphylaxis)',
      maker: 'Mylan (now Viatris); made by Pfizer’s Meridian', co: 'mylan',
      light: 'green',
      why: 'The US price of a two-pack went from about $100 to about $600; Mylan also misclassified it to cut Medicaid rebates.',
      self: { q: 'no', text: 'Not in question. Always carry it if prescribed.' },
      events: [
        { year: 2017, issue: 'price', status: 'paid', by: 'gov', amount: '$465m', usd: 465,
          title: 'Misclassified to dodge rebates',
          desc: 'Mylan classified EpiPen as a generic to pay smaller Medicaid rebates while raising the two-pack price from about $100 in 2007 to about $600 in 2016.',
          src: [S('BioSpace (2017)', 'https://www.biospace.com/mylan-finalizes-465-million-epipen-settlement')] },
        { year: 2022, issue: 'compete', status: 'paid', by: 'private', amount: '$609m', usd: 609,
          title: 'Antitrust class action',
          desc: 'Buyers alleged a pay-for-delay deal with Teva delayed a generic EpiPen. Pfizer settled for $345 million in 2021 and Viatris for $264 million in 2022, without admitting liability.',
          src: [S('NBC News (2022)', 'https://www.nbcnews.com/business/business-news/epipen-maker-pay-264-million-settle-lawsuit-rcna18082'), S('Viatris annual report (2022)', 'https://www.sec.gov/Archives/edgar/data/1792044/000119312523270456/d520890dars.pdf')] }
      ]
    },
    {
      id: 'isotretinoin', name: 'Isotretinoin', brands: 'Roaccutane, Oratane, Accutane', area: 'other', what: 'Severe acne',
      maker: 'Roche originally; now generic makers', co: 'roche',
      light: 'green',
      why: 'Thousands of US lawsuits claimed it caused bowel disease; some juries agreed, but the courts ended most cases.',
      self: { q: 'known', text: 'Very effective, but it causes birth defects and needs strict pregnancy prevention; mood changes should be reported.' },
      events: [
        { year: 2018, issue: 'harm', status: 'dismissed', by: 'private', tag: 'Mostly dismissed',
          title: 'Bowel-disease lawsuits',
          desc: 'Juries awarded plaintiffs between $2 million and $25 million in some trials, but New Jersey’s Supreme Court dismissed 532 claims in 2018, holding that FDA-approved warnings are presumed adequate.',
          src: [S('STAT (2018)', 'https://www.statnews.com/pharmalot/2018/10/04/roche-new-jersey-accutane-lawsuits/')] }
      ]
    },
    {
      id: 'restasis', name: 'Ciclosporin eye drops', brands: 'Restasis', area: 'other', what: 'Dry eye',
      maker: 'Allergan (now AbbVie)', co: 'abbvie',
      light: 'green',
      why: 'Allergan transferred its patents to a Native American tribe to try to shield them from challenge.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2020, issue: 'compete', status: 'paid', by: 'private', amount: '$51.25m', usd: 51.25,
          title: '"Renting" a tribe’s immunity',
          desc: 'Allergan sold its Restasis patents to the Saint Regis Mohawk Tribe, which licensed them straight back, claiming tribal immunity from patent challenges. Courts rejected the tactic, and Allergan settled buyers’ antitrust claims.',
          src: [S('Bloomberg Law (2020)', 'https://news.bloomberglaw.com/antitrust/allergans-restasis-antitrust-settlement-is-worth-51-million'), S('Allergan quarterly report (2018)', 'https://www.sec.gov/Archives/edgar/data/0001578845/000156459018010702/agn-10q_20180331.htm')] }
      ]
    },
    {
      id: 'botox', name: 'Botulinum toxin', brands: 'Botox', area: 'other', what: 'Migraine, spasticity, sweating and cosmetic use',
      maker: 'Allergan (now AbbVie)', co: 'abbvie',
      light: 'green',
      why: 'Allergan pleaded guilty to promoting Botox for unapproved uses and paying doctors as "advisers".',
      self: { q: 'no', text: 'Not in question for its approved uses.' },
      events: [
        { year: 2010, issue: 'fraud', status: 'paid', by: 'gov', amount: '$600m', usd: 600, crim: true,
          title: 'Off-label promotion',
          desc: 'Allergan pleaded guilty. It promoted Botox for headache, pain and other unapproved uses, paid doctors to sit on "advisory boards" and created a supposedly independent education group.',
          src: [S('US DOJ (2010)', 'https://www.justice.gov/opa/pr/2010/September/10-civ-988.html')] }
      ]
    },
    {
      id: 'clobetasol', name: 'Clobetasol', brands: 'Dermovate, Clobex', area: 'other', what: 'Severe eczema and psoriasis (strong steroid cream)',
      maker: 'Generic makers including Taro and Sandoz',
      light: 'green',
      why: 'Generic makers admitted fixing prices of this and other skin creams.',
      self: { q: 'no', text: 'Not in question.' },
      events: [
        { year: 2020, during: [2013, 2015], issue: 'price', status: 'paid', by: 'gov', amount: '$205.7m', usd: 205.7,
          title: 'Price-fixing',
          desc: 'Taro admitted conspiring with Sandoz to allocate customers and fix prices of generic drugs including clobetasol, under a deferred prosecution agreement. It paid a further $213 million in a civil settlement in 2021; Sandoz paid $195 million in 2020.',
          src: [S('Faruqi & Faruqi', 'https://www.faruqilaw.com/blog/564/taro-agrees-to-pay-205-million-to-resolve-price-fixing-charges'), S('Taro annual report (2022)', 'https://www.sec.gov/Archives/edgar/data/906338/000095017022012998/taro-20220331.htm'), S('CNBC (2020)', 'https://www.cnbc.com/2020/03/02/novartis-subsidiary-sandoz-to-pay-195-million-over-antitrust-allegations.html')] }
      ]
    }
  ];

  return { AREAS, MEDS };
})();
