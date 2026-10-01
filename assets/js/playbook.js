/* The playbook: sixteen recurring tactics. Content is authored here (trusted HTML). */
window.PLAYBOOK = [
  // ───────── Rigging the science ─────────
  {
    id: 'bury', group: 'science', title: 'Bury the bad trials',
    hook: 'Run ten trials, publish the three that worked.',
    stat: '<strong>94%</strong> of published antidepressant trials looked positive. The FDA rated <strong>51%</strong> positive.',
    body: `
      <p class="pull">If you only publish the trials that worked, any drug can look effective, and doctors have no way of knowing what is missing.</p>
      <h4>How it works</h4>
      <p>Trials with disappointing results quietly stay in the filing cabinet. Unlike outright fraud, this was legal for decades. The published literature, which doctors, guideline writers and meta-analyses depend on, becomes a highlight reel.</p>
      <h4>The evidence</h4>
      <ul>
        <li><strong>Antidepressants:</strong> of 74 trials submitted to the FDA, 31% were never published. The FDA judged 51% positive; the journals made it look like 94%. <a href="#lab">See the animation</a>.</li>
        <li><strong>Reboxetine (Pfizer):</strong> data on 74% of trial patients were unpublished. Once German regulators (IQWiG) forced it out, the drug turned out to be "overall ineffective and potentially harmful". Published studies had overstated its benefit over placebo by up to 115%.</li>
        <li><strong>Seroquel (AstraZeneca):</strong> a 1999 internal email released in court read "we have buried Trials 15, 31, 56". Trial 15 had shown patients gaining about 5 kg a year.</li>
        <li><strong>Tamiflu (Roche):</strong> governments spent billions stockpiling it while Cochrane researchers spent years trying to get the full trial reports. Once they were released, the evidence for preventing complications and hospital admissions was not there.</li>
        <li><strong>Vytorin (Merck/Schering-Plough):</strong> the ENHANCE trial finished in 2006, but its null result was released only in January 2008. Shareholders later recovered $688 million.</li>
      </ul>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Partly.</strong> Journals have required trial registration since 2005. US law (FDAAA, 2007) and EU rules require results to be posted, and the AllTrials campaign (from 2013) won commitments from GSK, J&amp;J and others. In 2018 only 49.5% of due EU trials had posted results, but industry sponsors did far better (68%) than universities and hospitals (11%). The worst publication bias today is often academic.</div>`
  },
  {
    id: 'switch', group: 'science', title: 'Move the goalposts',
    hook: 'Promise to measure X. Report Y, because Y looked better.',
    stat: 'Only <strong>9 of 67</strong> trials in top journals reported their outcomes as pre-specified.',
    body: `
      <p class="pull">A trial is supposed to declare up front what it is testing. Switch outcomes after seeing the data and you can always find a winner.</p>
      <h4>How it works</h4>
      <p>"Outcome switching" means quietly dropping the pre-specified primary outcome when it fails and promoting a secondary one that happened to come up significant. Its sibling is <strong>spin</strong>: writing a positive-sounding abstract for a trial whose main result was negative.</p>
      <h4>The evidence</h4>
      <ul>
        <li><strong>COMPare (Oxford, 2015–16):</strong> the team checked every trial published over six weeks in NEJM, The Lancet, JAMA, BMJ and Annals. Only 9 of 67 reported outcomes as pre-specified. 301 pre-specified outcomes went unreported, and 357 new ones were silently added. Of 58 correction letters, journals published 23; NEJM and JAMA rejected all of theirs.</li>
        <li><strong>Spin:</strong> among 72 trials whose primary outcome was not statistically significant, 58% still had spin in the abstract’s conclusions (Boutron, JAMA 2010).</li>
        <li><strong>Study 329 (GSK, Paxil):</strong> neither protocol-specified primary outcome showed a benefit, but the paper led with outcomes that were not in the protocol and concluded paroxetine was "effective".</li>
      </ul>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Barely.</strong> Registration makes switching detectable, but someone still has to check, and journals often don't. Trial registries and the CONSORT reporting rules help readers who look.</div>`
  },
  {
    id: 'phack', group: 'science', title: 'Torture the data (p-hacking)',
    hook: 'Slice the data enough ways and something will confess.',
    stat: 'Test 20 outcomes on a useless drug: <strong>64%</strong> chance of at least one "significant" result.',
    body: `
      <p class="pull">A p-value of 0.05 means a 1-in-20 chance of a false alarm per test. Run 20 tests and a false alarm is more likely than not.</p>
      <h4>How it works</h4>
      <ul>
        <li><strong>Multiple outcomes:</strong> measure lots of things and report the ones that "worked".</li>
        <li><strong>Subgroup fishing:</strong> no effect overall? Try men, women, over-65s, smokers, or patients from Europe.</li>
        <li><strong>Optional stopping:</strong> check the data repeatedly and stop the trial the moment it crosses p &lt; 0.05.</li>
        <li><strong>Analytic flexibility:</strong> exclude "outliers", change the statistical model, adjust for different covariates, redefine who counts as a responder.</li>
        <li><strong>HARKing</strong> (Hypothesising After the Results are Known): present the accident as the plan.</li>
      </ul>
      <h4>See it for yourself</h4>
      <p>The <a href="#lab">p-hacking lab</a> runs real simulated trials of a sugar pill. With a handful of choices you can push the false-positive rate from 5% past 60%.</p>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Partly.</strong> Pre-registered statistical analysis plans, independent data-monitoring committees and regulators' access to raw data help a great deal in pivotal licensing trials. Post-marketing studies, conference posters and marketing materials are much less policed.</div>`
  },
  {
    id: 'rig', group: 'science', title: 'Rig the comparison',
    hook: 'Test against a dummy, the wrong dose, or a number that doesn’t matter.',
    stat: 'Industry-sponsored studies are <strong>27%</strong> more likely to report favourable efficacy results.',
    body: `
      <p class="pull">You don’t have to fake anything if you choose a fight you can’t lose.</p>
      <h4>Common moves</h4>
      <ul>
        <li><strong>Wrong-dose comparator:</strong> new antipsychotics were often tested against high doses of the old drug haloperidol, which exaggerated the old drug’s side effects (Geddes et al., BMJ 2000).</li>
        <li><strong>Placebo when a real treatment exists:</strong> beating nothing is easier than beating the current best.</li>
        <li><strong>Surrogate endpoints:</strong> show the drug improves a blood test (cholesterol, blood sugar, tumour shrinkage) rather than proving people live longer or feel better. Vytorin lowered LDL cholesterol but did not reduce artery plaque in ENHANCE.</li>
        <li><strong>Relative risk headlines:</strong> "halves your risk!" can mean going from 2 in 1,000 to 1 in 1,000.</li>
        <li><strong>Selective follow-up:</strong> Pfizer’s Celebrex CLASS trial was published using 6 months of data. The full trial data, later posted by the FDA, did not support the ulcer advantage claimed.</li>
      </ul>
      <h4>The evidence</h4>
      <p>A 2017 Cochrane review of 75 studies found industry-sponsored drug and device studies more often had favourable efficacy results (risk ratio 1.27) and favourable conclusions (1.34) than non-industry studies, even when the measured risk of bias was similar.</p>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Not really.</strong> Health-technology assessors such as Australia’s PBAC, Germany’s IQWiG and the UK’s NICE scrutinise comparators hard, which is one reason drugs are cheaper here. Regulators still approve on surrogate endpoints, increasingly so under "accelerated" pathways.</div>`
  },
  {
    id: 'ghost', group: 'science', title: 'Ghostwriters & fake journals',
    hook: 'Write the paper in-house. Put a professor’s name on it.',
    stat: '<strong>26</strong> ghostwritten papers backed Wyeth’s hormone therapy.',
    body: `
      <p class="pull">A paper "by" an eminent professor carries weight. A paper by a marketing agency does not. So the agency writes it, and the professor signs it.</p>
      <h4>Cases</h4>
      <ul>
        <li><strong>Wyeth (now Pfizer):</strong> court documents showed the medical-writing firm DesignWrite produced 26 papers (1998–2005) that played up benefits and played down risks of Premarin/Prempro hormone therapy, without disclosing Wyeth’s role. Then the Women’s Health Initiative trial found increased breast cancer, heart disease and stroke.</li>
        <li><strong>Merck in Australia:</strong> Merck paid Elsevier to publish the <i>Australasian Journal of Bone &amp; Joint Medicine</i>, a sponsored compilation dressed as a peer-reviewed journal. In one issue 9 articles referred to Vioxx and 12 to Fosamax.</li>
        <li><strong>GSK Study 329:</strong> the 2001 paper was first drafted by a company-hired writer, then appeared under the names of academic authors.</li>
        <li><strong>Pfizer-funded fraud:</strong> anaesthetist Scott Reuben, a Pfizer research grantee and speaker, fabricated data in 21 published papers on painkillers including Celebrex. He went to prison for six months in 2010.</li>
      </ul>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Mostly, on paper.</strong> ICMJE authorship rules and the GPP guidelines now require medical writers and funders to be acknowledged. "Assisted" writing is still common, but it has to be declared.</div>`
  },
  {
    id: 'harm', group: 'science', title: 'Hide the harms',
    hook: 'Know about a side effect. Don’t tell anyone.',
    stat: 'Vioxx: an estimated <strong>88,000–140,000</strong> extra cases of serious heart disease in the US.',
    body: `
      <p class="pull">The most dangerous tactic is also the simplest: sit on the safety signal while the sales keep coming.</p>
      <h4>Cases</h4>
      <ul>
        <li><strong>Vioxx (Merck):</strong> the VIGOR trial paper in NEJM left out three heart attacks, and the journal later published an "expression of concern". Merck withdrew Vioxx in 2004 and paid $4.85 billion to settle about 27,000 lawsuits.</li>
        <li><strong>Avandia (GSK):</strong> a 2007 meta-analysis linked the diabetes drug to a significantly higher heart-attack risk. A US Senate report later accused GSK of trying to intimidate a critic and of knowing about the risk for years. GSK’s 2012 guilty plea included failing to report Avandia safety data.</li>
        <li><strong>Zyprexa (Lilly):</strong> about $1.2 billion paid to settle around 32,000 claims that it played down weight gain and diabetes.</li>
        <li><strong>Actos (Takeda):</strong> a jury found Takeda hid bladder-cancer risks. Takeda paid $2.37 billion to settle about 9,000 cases.</li>
        <li><strong>Plavix (BMS & Sanofi):</strong> Hawaii argued they knew the drug worked less well in many Pacific Islander and East Asian patients. Settled for $700 million in 2025.</li>
        <li><strong>Roche:</strong> about 80,000 unassessed side-effect reports were discovered in 2012, including reports of 15,161 deaths.</li>
      </ul>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Somewhat.</strong> Pharmacovigilance rules, FDA safety-communication powers (since 2007) and the EU’s risk-management plans are much stronger. But harms are still under-reported in trial publications compared with benefits.</div>`
  },
  {
    id: 'fake', group: 'science', title: 'Fake data & marketing "trials"',
    hook: 'When the science won’t cooperate, make some up, or run a "trial" that is really an advert.',
    stat: 'Ranbaxy pleaded guilty to <strong>7 felonies</strong>, including lying to the FDA.',
    body: `
      <h4>Outright fabrication</h4>
      <ul>
        <li><strong>Ranbaxy (2013):</strong> the Indian generics maker pleaded guilty to making false statements to the FDA and selling adulterated drugs, and paid $500 million.</li>
        <li><strong>Novartis Diovan (Japan):</strong> university trials promoting the blood-pressure drug turned out to rest on manipulated data, and a Novartis employee had secretly worked on the statistics. The court acquitted because, under Japanese law, a research paper is not "advertising".</li>
        <li><strong>Zolgensma (Novartis/AveXis, 2019):</strong> the company knew of manipulated animal data before the FDA approved the $2.1 million gene therapy, and disclosed it afterwards.</li>
      </ul>
      <h4>"Seeding trials"</h4>
      <p>Studies designed by marketing departments to get doctors prescribing, with little scientific value. Merck’s ADVANTAGE trial of Vioxx and Pfizer’s STEPS trial of Neurontin were later described in medical journals, using the companies’ own documents, as marketing exercises.</p>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Partly.</strong> FDA and EMA inspections of trial sites and factories catch more than they used to, and data-integrity warning letters are now routine. Seeding trials still exist as "post-marketing studies".</div>`
  },
  // ───────── Buying the prescription ─────────
  {
    id: 'offlabel', group: 'selling', title: 'Sell it for what it wasn’t approved for',
    hook: 'Approved for epilepsy? Sell it for pain, migraine and bipolar disorder.',
    stat: 'The five biggest pharma guilty pleas of 2009–13 were all about off-label sales: <strong>$10.4 billion</strong>.',
    body: `
      <p class="pull">Doctors may prescribe off-label. Companies may not promote off-label uses, because those uses were never proven safe and effective.</p>
      <h4>The biggest cases</h4>
      <ul>
        <li><strong>GSK, $3 billion (2012):</strong> Paxil for children and Wellbutrin for weight loss and sexual dysfunction.</li>
        <li><strong>Pfizer, $2.3 billion (2009):</strong> the painkiller Bextra at doses and for uses the FDA had refused, plus Geodon, Zyvox and Lyrica.</li>
        <li><strong>J&amp;J, $2.2 billion (2013):</strong> Risperdal for elderly dementia patients and children.</li>
        <li><strong>Abbott, $1.5 billion (2012):</strong> Depakote to sedate nursing-home residents with dementia.</li>
        <li><strong>Lilly, $1.415 billion (2009):</strong> Zyprexa for dementia and other unapproved uses.</li>
        <li><strong>Janssen, $1.64 billion judgment (2025, under appeal):</strong> HIV drugs promoted as "lipid-neutral".</li>
      </ul>
      <p>A recurring target was the antipsychotic in the nursing home: dementia patients sedated with drugs that carry a boxed warning for increased death in exactly that group.</p>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Fewer mega-cases, but not necessarily less promotion.</strong> After a 2012 US appeals-court ruling (<i>US v Caronia</i>) treated truthful off-label speech as protected, criminal off-label prosecutions largely dried up. Whistleblower civil cases continue: Janssen’s 2025 judgment is the largest in years.</div>`
  },
  {
    id: 'kickbacks', group: 'selling', title: 'Pay the prescriber',
    hook: '"Speaker fees", fishing trips and "consulting" in exchange for scripts.',
    stat: 'Novartis ran <strong>tens of thousands</strong> of sham speaker events in 2002–11.',
    body: `
      <p class="pull">Under US law, paying anyone to induce a prescription billed to Medicare or Medicaid is a crime. It keeps happening.</p>
      <h4>Methods</h4>
      <ul>
        <li><strong>Sham speaker programmes:</strong> Novartis paid $678 million (2020) over events that were "speaker programmes" in name only: fishing trips, golf, wine tastings and expensive dinners, where little or nothing was presented. Insys used the same model for a fentanyl spray, and its founder went to prison. Gilead (2025) and Biohaven/Pfizer (2025) paid over similar allegations.</li>
        <li><strong>"Charity" copay conduits:</strong> money routed through supposedly independent foundations to cover Medicare patients’ copays, but only for the donor’s own drugs. This keeps patients on expensive brands while taxpayers pay. Pfizer, Novartis, Amgen and Teva ($425 million for Copaxone, 2024) have all paid over it.</li>
        <li><strong>Free stuff:</strong> free samples billed to Medicare (AstraZeneca’s Zoladex, TAP’s Lupron), free nurses (AbbVie’s Humira "ambassadors"), free product (Sanofi’s Hyalgan).</li>
        <li><strong>Pharmacy deals:</strong> Novartis rebates to pharmacies that pushed refills; J&amp;J payments to the nursing-home pharmacy Omnicare.</li>
      </ul>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>No.</strong> The US Sunshine Act (Open Payments, since 2013) made payments visible: $13.18 billion was reported for 2024 (most of it legitimate research funding and royalties). The government warned specifically about speaker programmes in 2020. Yet in fiscal 2025, drug makers paid over $660 million in copay and speaker-programme settlements, and new cases (Takeda, Dompé) were still landing in 2026.</div>`
  },
  {
    id: 'bribery', group: 'selling', title: 'Bribe officials abroad',
    hook: 'Cash for hospital tenders, from Beijing to Athens.',
    stat: 'GSK China: <strong>¥3 billion</strong> fine, the largest in Chinese corporate history.',
    body: `
      <h4>Cases</h4>
      <ul>
        <li><strong>GSK (China, 2014):</strong> convicted of running a "massive bribery network" through travel agencies; ¥3 billion (US$489 million) fine. Its UK head received a suspended prison sentence and was deported.</li>
        <li><strong>Novartis (2020):</strong> $347 million over Greece, Vietnam and South Korea.</li>
        <li><strong>Teva (2016):</strong> $519 million over Russia, Ukraine and Mexico.</li>
        <li><strong>US Foreign Corrupt Practices Act cases against</strong> Pfizer, J&amp;J, Lilly, AstraZeneca, BMS, Sanofi, GSK and Novartis, with Novo Nordisk and J&amp;J also caught paying kickbacks to Saddam Hussein’s government under the UN Oil-for-Food programme.</li>
        <li><strong>AstraZeneca (China, 2024):</strong> its country president was detained amid investigations; more than 100 former sales staff had already been jailed in a medical-insurance fraud case.</li>
      </ul>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Unclear.</strong> Compliance programmes are far bigger than in 2005, but cases keep surfacing about every year or two. In 2025 the US paused, then narrowed, enforcement of its foreign-bribery law, so fewer cases may now come to light.</div>`
  },
  {
    id: 'silence', group: 'selling', title: 'Silence the critics',
    hook: '"Neutralise." "Discredit." "Seek them out and destroy them where they live."',
    stat: 'Merck staff kept a list of critical doctors marked <strong>"neutralise"</strong>.',
    body: `
      <h4>Cases</h4>
      <ul>
        <li><strong>Merck (Vioxx):</strong> emails read out in Australia’s Federal Court described a list of doctors to "neutralise" or "discredit". One employee wrote: "we may need to seek them out and destroy them where they live." There were also hints that funding to institutions could be withdrawn.</li>
        <li><strong>GSK (Avandia):</strong> a 2007 US Senate Finance Committee report said GSK had intimidated a diabetes expert who raised heart concerns in 1999, including by complaining to his department head.</li>
        <li><strong>Litigation and PR:</strong> researchers who questioned drugs, from Tamiflu to Study 329, describe years of resistance to releasing data.</li>
      </ul>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Hard to measure.</strong> Most of what we know came out only through litigation discovery, which is exactly what companies try to avoid by settling cases before trial and asking for documents to be sealed.</div>`
  },
  {
    id: 'opioids', group: 'selling', title: 'The opioid playbook',
    hook: 'Tell doctors addiction is rare. Reward the high prescribers.',
    stat: 'Purdue: <strong>2 guilty pleas</strong> (2007, 2020) and a $7.4 billion bankruptcy plan.',
    body: `
      <p class="pull">The deadliest marketing campaign of the era combined every tactic on this page: misleading claims, kickbacks, suppressed warnings and pressure to keep raising doses.</p>
      <h4>What happened</h4>
      <ul>
        <li><strong>Purdue Pharma:</strong> marketed OxyContin from 1996 with claims that addiction was rare, leaning on a five-sentence 1980 letter to a journal that had nothing to do with long-term pain treatment. It pleaded guilty in 2007 (executives got probation) and again in 2020 to three federal felonies. The Sackler family will pay up to $6.5 billion under a plan confirmed in November 2025.</li>
        <li><strong>Insys:</strong> bribed doctors to prescribe a fentanyl spray intended for cancer pain. Its founder was sentenced to 66 months in prison.</li>
        <li><strong>The settlements:</strong> J&amp;J ($5 billion, 2021), Teva ($4.25 billion, 2022) and Allergan, now AbbVie ($2.37 billion, 2022). The consultants McKinsey paid about $600 million for advising Purdue on how to "turbocharge" sales.</li>
        <li><strong>Australia’s role:</strong> J&amp;J’s then-subsidiary Tasmanian Alkaloids grew the high-thebaine poppies that became a key raw material for oxycodone.</li>
      </ul>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Reckoning, not repair.</strong> Prescribing has fallen sharply since 2012, but the epidemic moved to illicit fentanyl. Settlement money (about $50 billion across the industry) is now funding treatment, which is welcome but decades late.</div>`
  },
  // ───────── Gaming the money ─────────
  {
    id: 'overcharge', group: 'money', title: 'Overcharge the taxpayer',
    hook: 'Inflate the list price government pays; hide the discounts.',
    stat: 'Merck, Pfizer/Wyeth and Mylan paid <strong>$1.9 billion</strong> between them over hidden discounts.',
    body: `
      <h4>How it works</h4>
      <p>US public programmes pay for drugs based on prices that companies themselves report. Medicaid is owed the "best price" given to any customer. So companies have inflated reported prices and hidden discounts.</p>
      <ul>
        <li><strong>Hidden "best prices":</strong> Merck ($650 million, 2008), Wyeth/Pfizer Protonix ($784.6 million, 2016), Schering-Plough Claritin ($345.5 million, 2004).</li>
        <li><strong>Inflated "average wholesale price":</strong> Aventis Anzemet ($190 million, 2007) and BMS (2007).</li>
        <li><strong>Misclassification:</strong> Mylan called EpiPen a "generic" to pay smaller Medicaid rebates while raising its price about six-fold (2017, $465 million).</li>
        <li><strong>Retroactive price rises left out of rebate maths:</strong> Lilly’s $183.7 million judgment became final in 2026.</li>
      </ul>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Somewhat.</strong> Price-reporting rules are tighter and Medicare can now negotiate some prices (Inflation Reduction Act, 2022). Cases are still being decided.</div>`
  },
  {
    id: 'block', group: 'money', title: 'Block the competition',
    hook: 'Pay rivals to stay away, or bury them in patents.',
    stat: 'Humira: <strong>132 patents</strong> kept US biosimilars away until 2023, five years after Europe.',
    body: `
      <h4>Methods</h4>
      <ul>
        <li><strong>Pay-for-delay:</strong> pay a generic maker to drop its challenge and stay off the market. Cephalon paid about $300 million to four generic makers to protect Provigil, and the FTC later recovered $1.2 billion (2015). GSK was fined in the UK over paroxetine. BMS lied to the FTC about its Plavix deal.</li>
        <li><strong>Patent thickets and evergreening:</strong> stack up dozens of secondary patents. AbbVie’s 132 Humira patents delayed US biosimilars until 2023, while Europe had them in 2018; courts found it lawful. Teva was fined €462.6 million by the EU in 2024 for misusing divisional patents on Copaxone.</li>
        <li><strong>Sham litigation:</strong> AbbVie was found to have filed baseless suits to delay generic AndroGel.</li>
        <li><strong>Cartels:</strong> Roche led the 1990s global vitamin cartel. Teva, Sandoz and others fixed prices of everyday generics in 2013–15.</li>
        <li><strong>Misleading patent offices:</strong> AstraZeneca over Losec (EU, upheld 2012).</li>
      </ul>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>No.</strong> Pay-for-delay deals became riskier after the US Supreme Court’s <i>Actavis</i> decision (2013), but patent thickets remain legal, and the US patent system still rewards volume.</div>`
  },
  {
    id: 'gouge', group: 'money', title: 'Charge what the market will bear',
    hook: 'If patients can’t live without it, the price has no ceiling.',
    stat: 'US brand-name drug prices: about <strong>4.2×</strong> other rich countries before rebates, more than 3× after.',
    body: `
      <h4>Examples</h4>
      <ul>
        <li><strong>Daraprim (Vyera/Shkreli):</strong> $13.50 to $750 a pill overnight in 2015. Martin Shkreli was later banned from the industry for life.</li>
        <li><strong>Phenytoin (Pfizer, UK):</strong> the NHS price of an old epilepsy drug rose 780–1,600% after a "de-branding" deal.</li>
        <li><strong>Humira (AbbVie):</strong> the US list price rose about 470%, to about $77,000 a year, and executive bonuses were tied to Humira revenue.</li>
        <li><strong>Insulin (Lilly, Novo, Sanofi):</strong> a century-old drug whose US list prices climbed for decades. All three cut prices 70–78% in 2023, under political and legal pressure.</li>
        <li><strong>Launch prices:</strong> the median annual list price of a new US drug reached about $300,000 in 2023, up 35% in a year.</li>
      </ul>
      <p>The US pays about 2.78 times what 33 other OECD countries pay across all medicines (RAND, 2024). Australia’s PBS negotiates centrally, which is why the same drugs typically cost far less here.</p>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Worse, then some pressure.</strong> Launch prices keep rising. In 2022 Medicare gained power to negotiate some prices. In 2025 the US government pressed companies, starting with Pfizer and AstraZeneca, into "most-favoured-nation" pricing deals; it is too early to measure the effect.</div>`
  },
  {
    id: 'tax', group: 'money', title: 'Book the profits somewhere sunny',
    hook: 'Sell in America, declare the profit in Bermuda.',
    stat: 'AbbVie: <strong>~1%</strong> of taxable income booked in the US with most of its sales there (2020).',
    body: `
      <h4>Cases</h4>
      <ul>
        <li><strong>GSK (2006):</strong> paid about $3.4 billion to settle the largest tax dispute in IRS history, over how much profit it had shifted out of the US.</li>
        <li><strong>AbbVie:</strong> a 2021 Senate Finance Committee report found AbbVie made about three-quarters of its sales in the US but booked about 1% of its taxable income there, through subsidiaries in Bermuda and Puerto Rico. Effective tax rates were 8.6–11.2% in 2018–20.</li>
      </ul>
      <p>Much of this is legal tax planning, which is the point: the rules let companies whose research is heavily subsidised by public money, and whose prices are paid by public programmes, pay low tax on the profits.</p>
      <h4>Has it been fixed?</h4>
      <div class="fix"><strong>Somewhat.</strong> The OECD 15% global minimum tax, phasing in since 2024, narrows the gap. It does not close it.</div>`
  }
];
