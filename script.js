/* Evitar Agent Platform — component logic (REFERENCE).
 * This is the state + data model + render values that drive the page:
 * segment data, goal selector, recommended agents, journeys, Command Center
 * KPIs/widgets, shared-memory rules, WhatsApp config, governance, role views.
 *
 * In the prototype this runs inside a small template runtime. When porting to
 * React/Vue/etc, reuse the DATA and STATE shape below; rebuild the markup from
 * index.html using your codebase’s components. All numbers are illustrative. */

class Component extends DCLogic {
  state = {
    seg: 'insurance', prompt: 0, voice: 'anika', goal: 'conversion', recIndex: 0,
    empathy: 65, sales: 45, interrupt: 40,
    selected: { voice: true, quality: true },
    rules: { missed: true, noreply: true, resume: true, escalate: true, renewal: false },
    waTone: 'Professional', waStyle: 'Guided assistance', cmdRole: 'ops',
    waLangs: { English: true, Hindi: true, Hinglish: true, Marathi: false, Tamil: false, Bengali: false },
    waRich: { 'Buttons': true, 'Carousels': false, 'PDFs': true, 'Payment links': true, 'Voice notes': true },
    govT: { handoff: true, prompts: true, sources: true, escalation: true, audit: true }
  };

  componentDidMount() { this._rec = setInterval(() => this.setState(s => ({ recIndex: s.recIndex + 1 })), 3600); }
  componentWillUnmount() { if (this._rec) clearInterval(this._rec); }
  addAgents(keys) { this.setState(s => { const sel = { ...s.selected }; keys.forEach(k => sel[k] = true); return { selected: sel }; }); }
  toggleRule(k) { this.setState(s => ({ rules: Object.assign({}, s.rules, { [k]: !s.rules[k] }) })); }
  toggleSet(group, k) { this.setState(s => ({ [group]: Object.assign({}, s[group], { [k]: !s[group][k] }) })); }
  setField(key, val) { this.setState({ [key]: val }); }

  agentList() {
    return [
      { code: 'VO', key: 'voice', name: 'AI Voice Agent', tag: 'Sales · Renewals', group: 'ENGAGE', desc: 'Outbound and inbound calls that qualify, renew, collect and confirm — consultative, in 10+ Indian languages, with behaviour sliders and opening-line override.' },
      { code: 'WA', key: 'whatsapp', name: 'WhatsApp Agent', tag: 'Voice notes + text', group: 'ENGAGE', desc: 'Nudges, document collection, payment links and TTS voice notes — two-way, on the channel India actually replies to.' },
      { code: 'WB', key: 'chat', name: 'Web Chat Agent', tag: 'Website RIC', group: 'ENGAGE', desc: 'Rich interactive chat that answers, qualifies and warm-transfers to a human — on your own site or portal.' },
      { code: 'FF', key: 'form', name: 'Form-Filling Agent', tag: 'Voice-assisted capture', group: 'ENGAGE', desc: 'Completes applications and KYC by voice — fewer drop-offs, cleaner first-time-right data.' },
      { code: 'FB', key: 'field', name: 'Field Buddy', tag: 'Feet-on-street', group: 'ENGAGE', desc: 'A field-sales co-pilot: visit prep, in-language pitch help, objection handling and notes captured by voice.' },
      { code: 'QT', key: 'quality', name: 'Quality & Training', tag: '100% scored', group: 'IMPROVE', desc: 'VTT transcription and Call Quality Index on every call — human and AI — personalised coaching from real gaps, before/after proof, human-in-the-loop approvals.' },
      { code: 'CC', key: 'command', name: 'Command Center', tag: 'Ops & insight', group: 'ORCHESTRATE', desc: 'Role-based analytics across acquisition and renewals — Voice of Customer, competition matrix, channel comparison, AI insights, and a co-pilot for every role that suggests the next-best corrective action.' }
    ];
  }

  segData() {
    return {
      insurance: {
        label: 'Life & General Insurance',
        demoHead: "Today's bot redirects. An Evitar agent resolves.",
        demoContext: 'Term & health · acquisition, renewals, servicing',
        prompts: ['Price', 'In Hindi', 'Missed premium', 'Callback'],
        convos: [
          { q: 'How much does ₹1 crore cover cost at 35?', today: "I didn't understand that. Please choose from the menu: 1) Products 2) Branches 3) Claims.", ev: "For a 35-yr-old non-smoker, ₹1 crore term cover starts around ₹15–30 a day. Exact premium depends on age, smoking status and term — shall I pull your exact quote? I'll just need your date of birth." },
          { q: 'mujhe apne parivar ke liye term plan chahiye', today: 'Sorry, I can only respond in English. Please type a menu option.', ev: 'Bilkul! Parivar ko suraksha dena samajhdaari ka faisla hai. Cover aam taur par income ka 10–15 guna hona chahiye. Do baatein bataaiye — umar aur saalana income — main sahi cover aur premium bata deta hoon.' },
          { q: 'I missed my premium payment — what now?', today: 'For payment queries, please call our helpline or visit the nearest branch.', ev: "No need to worry — you're likely within the grace period, so cover continues if you pay within the window. I can pull your policy and send the exact due amount and a payment link right here." },
          { q: 'Can someone call me tomorrow at 7pm?', today: "Please type 'menu' to see available options.", ev: "Done — callback booked for tomorrow, 7:00 PM, an advisor will call this number. So they're ready: new plan, existing policy, or a claim?" }
        ],
        c8: {
          outcomes: ['Higher lead conversion', 'Higher persistency', 'Lower servicing cost', 'Stronger multilingual reach'],
          journeys: ['Quote-to-policy', 'Renewal save', 'Servicing & self-serve'],
          rubric: ['Lead quality', 'Renewal coaching', 'Advisor effectiveness', 'Claims-servicing QA'],
          regulatory: ['IRDAI alignment', 'Policy disclosures', 'Product suitability', 'Consent capture']
        }
      },
      lending: {
        label: 'HFCs & NBFCs',
        demoHead: "Today's bot redirects. An Evitar agent recovers.",
        demoContext: 'Secured & unsecured lending · collections, servicing',
        prompts: ['Due date', 'Hardship', 'Paid already', 'Callback'],
        convos: [
          { q: 'Meri EMI kab tak bharni hai?', today: 'For payment queries, please call our helpline or visit the nearest branch.', ev: 'Aapki EMI ki due date 7 tarikh hai. Main abhi exact amount aur ek payment link yahin bhej deta hoon — pay karte hi confirmation mil jayega. Kya main link bhej doon?' },
          { q: 'I lost my job — can I get more time to pay?', today: "I didn't understand that. Please choose from the menu: 1) Balance 2) Branches 3) Foreclosure.", ev: 'I understand, and thank you for telling us early. You may be eligible for a short revised arrangement. Can I note a date you expect to pay by? I will record the commitment and have the right team confirm the options with you.' },
          { q: 'I already paid yesterday, why are you calling?', today: 'Our records may not be updated. Please call the helpline.', ev: "Apologies for the call — let me check. I can see a payment in process; it typically reflects within 24 hours. I'll send you the receipt reference here and stop further reminders for this cycle." },
          { q: 'Call me after 6pm today', today: "Please type 'menu' to see available options.", ev: "Done — I've scheduled a callback for after 6:00 PM on this number. Is it about the current EMI, or a settlement option?" }
        ],
        c8: {
          outcomes: ['Lower cost-to-collect', 'Wider reach', 'Higher contactability', 'Better collections efficiency'],
          journeys: ['Collections follow-up', 'EMI reminder', 'Servicing & self-serve'],
          rubric: ['Collections compliance', 'PTP-capture quality', 'Recovery effectiveness', 'EMI-servicing QA'],
          regulatory: ['RBI collections norms', 'Approved scripts', 'Escalation controls', 'Audit trails']
        }
      },
      cards: {
        label: 'Cards',
        demoHead: "Today's bot redirects. An Evitar agent resolves.",
        demoContext: 'Credit cards · acquisition, activation, retention',
        prompts: ['Benefits', 'Rewards', 'Limit increase', 'Callback'],
        convos: [
          { q: 'What are the benefits on this card?', today: "I didn't understand that. Please choose from the menu: 1) Apply 2) Offers 3) Customer care.", ev: "Happy to help. This card's headline benefits are accelerated rewards on dining and travel, lounge access and milestone vouchers. Want me to check which spends earn you the most based on how you usually use a card?" },
          { q: 'How do I redeem my reward points?', today: 'For rewards queries, please visit the website or call customer care.', ev: 'You can redeem against statement balance, vouchers or partner catalogues. I can see your available points and walk you through the fastest redemption right here — shall I show the options?' },
          { q: 'I want to increase my credit limit', today: "Please type 'menu' to see available options.", ev: "I can start that for you. Eligibility depends on your spends and history — I'll capture the request, run the eligibility check, and a specialist will confirm the revised limit. Shall I proceed?" },
          { q: 'Can someone call me tomorrow evening?', today: 'Sorry, I can only respond in English. Please type a menu option.', ev: "Done — callback booked for tomorrow evening on this number. So they're ready: a new card, an existing card, or a rewards question?" }
        ],
        c8: {
          outcomes: ['Higher activation', 'Stronger retention', 'More rewards usage', 'Lower cost-to-serve'],
          journeys: ['Card activation', 'Rewards redemption', 'Retention save'],
          rubric: ['Activation effectiveness', 'Retention-call quality', 'Rewards-servicing QA', 'Limit-request handling'],
          regulatory: ['Card disclosures', 'Fraud-escalation controls', 'Consent management', 'Dispute handling']
        }
      }
    };
  }

  toggle(key) { this.setState(s => ({ selected: { ...s.selected, [key]: !s.selected[key] } })); }

  renderVals() {
    const seg = this.state.seg;
    const SEG = this.segData();
    const S = SEG[seg];
    const sel = this.state.selected;

    const enrich = (a) => ({ ...a, on: !!sel[a.key], off: !sel[a.key], toggle: () => this.toggle(a.key) });
    const all = this.agentList().map(enrich);
    const heroAgents = all;
    const selectedAgents = all.filter(a => a.on);
    const byGroup = (g) => all.filter(a => a.group === g);
    const groups = [
      { label: 'Engage · customer-facing', color: '#19E08C', cols: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', items: byGroup('ENGAGE') },
      { label: 'Improve · quality & training', color: '#5FBDEA', cols: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', items: byGroup('IMPROVE') },
      { label: 'Orchestrate · command center', color: '#5FBDEA', cols: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', items: byGroup('ORCHESTRATE') }
    ];

    const segChips = Object.keys(SEG).map(k => ({ key: k, label: SEG[k].label, active: seg === k, inactive: seg !== k, onClick: () => this.setState({ seg: k, prompt: 0, goal: ({ insurance: 'conversion', lending: 'sourcing', cards: 'approvals' })[k] }) }));
    const prompts = S.prompts.map((label, i) => ({ label, active: this.state.prompt === i, inactive: this.state.prompt !== i, onClick: () => this.setState({ prompt: i }) }));
    const convo = S.convos[this.state.prompt] || S.convos[0];

    const c8groups = [
      { label: 'Primary outcomes', color: '#19E08C', items: S.c8.outcomes },
      { label: 'Key journeys', color: '#5FBDEA', items: S.c8.journeys },
      { label: 'Quality rubric', color: '#5FBDEA', items: S.c8.rubric },
      { label: 'Regulatory alignment', color: '#19E08C', items: S.c8.regulatory }
    ];

    const voiceData = [
      { key: 'vikram', initial: 'V', name: 'Vikram', note: 'male · warm, professional — renewals' },
      { key: 'anika', initial: 'A', name: 'Anika', note: 'female · clear, confident — policy & benefits' },
      { key: 'arvind', initial: 'R', name: 'Arvind', note: 'male · steady, reassuring — senior profiles' }
    ];
    const voices = voiceData.map(v => {
      const active = this.state.voice === v.key;
      return { ...v, active, onClick: () => this.setState({ voice: v.key }), border: active ? 'rgba(25,224,140,0.45)' : 'rgba(255,255,255,0.08)', bg: active ? 'rgba(25,224,140,0.06)' : 'rgba(255,255,255,0.02)' };
    });

    const mkSlider = (key, label, left, right) => {
      const val = this.state[key];
      return { key, label, left, right, val, fillStyle: 'background: linear-gradient(90deg, #19E08C 0%, #19E08C ' + val + '%, #1b2436 ' + val + '%);', onInput: (e) => this.setState({ [key]: parseInt(e.target.value, 10) }) };
    };
    const sliders = [mkSlider('empathy', 'Empathy', 'Direct', 'Warm'), mkSlider('sales', 'Sales intensity', 'Soft nurture', 'Hard close'), mkSlider('interrupt', 'Interrupt sensitivity', 'Patient', 'Responsive')];

    const qualitySteps = [
      { step: '01 · CAPTURE', title: '100% transcription', line: 'Every call, human and AI — not 2–5% manual sampling.' },
      { step: '02 · SCORE', title: 'Call Quality Index', line: 'Configurable rubric: discovery, objections, compliance, close.' },
      { step: '03 · LISTEN', title: 'Voice of Customer', line: 'Sentiment and friction from the conversation — not a survey.' },
      { step: '04 · FEEDBACK', title: 'End-of-day report', line: 'A specific daily picture, per agent, of what to fix.' },
      { step: '05 · COACH', title: 'Personalised training', line: "Built from that agent's real gaps, assigned and tracked." },
      { step: '06 · PROVE', title: 'Before / after', line: 'Re-tested. If it stalls, a human trainer steps in.' }
    ];

    const controls = [
      { h: 'Data residency in India', rest: 'Hosted and processed in-country, end to end.' },
      { h: 'Aligned to RBI, IRDAI, DPDP & TRAI', rest: 'Consent, disclosures and DND handled in-flow.' },
      { h: 'Grounded answers', rest: 'No model-invented figures — facts come from approved engines.' },
      { h: 'Human-in-the-loop', rest: 'Sensitive actions need approval before commit.' },
      { h: 'Full audit trail', rest: 'Every interaction logged, replayable, with role-based PII masking.' },
      { h: 'Approved content only', rest: 'Scripts and disclosures reviewed and locked before go-live.' }
    ];

    const stats = [
      { v: '100%', l: 'of calls transcribed, scored & auditable', s: 'Evitar operating standard' },
      { v: '10–20%', l: 'uplift in conversion from domain-level AI', s: 'McKinsey' },
      { v: '60–80%', l: 'of routine inquiries resolved without a human', s: 'Evitar operating standard' },
      { v: '10+', l: 'Indian languages, no extra headcount', s: 'Evitar operating standard' }
    ];

    // goal selector
    const idx = {}; all.forEach(a => idx[a.key] = a);
    const agentWhy = {
      voice: 'Calls back leads in under 10 seconds and qualifies them in under a minute.',
      whatsapp: 'Replies within 30 seconds, 24×7, in the customer’s language.',
      chat: 'Answers and qualifies on your website instantly; warm-transfers when needed.',
      form: 'Completes applications by voice — fewer drop-offs, cleaner first-time-right data.',
      field: 'Preps every visit and captures notes by voice for field teams.',
      quality: 'Scores 100% of calls and coaches agents from real gaps.',
      command: 'Tracks the funnel, agent performance and next-best actions in real time.'
    };
    const segExtra = {
      insurance: {
        heroSub: 'Improve lead conversion, policy issuance, renewals and servicing with AI agents built for insurance journeys.',
        lifecycle: ['Lead', 'Quote', 'Apply', 'Issue', 'Pay premium', 'Renew', 'Service', 'Retain'],
        kpis: [ { l: 'Quote-to-policy', v: '31%', d: '▲ 2.4pp' }, { l: 'Persistency · 13m', v: '87%', d: '▲ 1.2pp' }, { l: 'Renewal save rate', v: '64%', d: '▲ 3.1pp' }, { l: 'Agent quality (CQI)', v: '87.1%', d: '▲ 1.8pp' } ],
        widgets: [
          { label: 'Quote-to-policy funnel', sub: 'Quoted · proposed · issued', bars: [['Quoted', 88], ['Proposed', 57], ['Issued', 31]] },
          { label: 'Persistency by tenure', sub: '13-mo · 25-mo · 37-mo', bars: [['13-mo', 87], ['25-mo', 79], ['37-mo', 71]] },
          { label: 'Renewal pipeline', sub: 'Due · nudged · saved', bars: [['Due', 100], ['Nudged', 82], ['Saved', 64]] },
          { label: 'Channel mix', sub: 'Voice · WhatsApp · human', bars: [['Voice', 46], ['WhatsApp', 34], ['Human', 20]] }
        ],
        goalCats: [
          { cat: 'Growth', color: '#19E08C', goals: [
            { key: 'conversion', label: 'Increase lead conversion', outcome: 'Reach and qualify more leads, then warm them to a policy.', journey: ['Lead', 'Quote', 'Apply', 'Issue', 'Converted'], primary: ['voice', 'whatsapp'], supporting: ['quality', 'command'] },
            { key: 'issuance', label: 'Improve policy issuance', outcome: 'Turn more approved proposals into issued policies, faster.', journey: ['Proposal', 'Voice-assisted forms', 'Verify', 'Issue', 'Active'], primary: ['form', 'voice'], supporting: ['whatsapp', 'command'] },
            { key: 'renewals', label: 'Improve renewals', outcome: 'Flag at-risk policyholders early and protect persistency.', journey: ['Renewal due', 'Proactive nudge', 'Objection handled', 'Payment link', 'Renewed'], primary: ['voice', 'whatsapp'], supporting: ['quality', 'command'] }
          ] },
          { cat: 'Operations', color: '#5FBDEA', goals: [
            { key: 'service', label: 'Reduce service workload', outcome: 'Resolve routine policyholder queries instantly, on their channel.', journey: ['Query in', 'AI chat / WhatsApp', 'Resolved on thread', 'Escalate if needed', 'Closed'], primary: ['chat', 'whatsapp'], supporting: ['command'] },
            { key: 'productivity', label: 'Improve advisor productivity', outcome: 'Send advisors only warm, ready-to-buy customers.', journey: ['Lead pool', 'AI qualifies', 'Warm handoff', 'Advisor closes', 'Won'], primary: ['voice', 'whatsapp'], supporting: ['command'] }
          ] },
          { cat: 'Risk & Governance', color: '#19E08C', goals: [
            { key: 'callquality', label: 'Improve call quality', outcome: 'Score 100% of policyholder calls and coach from real gaps.', journey: ['Call captured', '100% transcribed', 'CQI scored', 'Coaching', 'Re-tested'], primary: ['quality'], supporting: ['command'] }
          ] },
          { cat: 'Leadership', color: '#5FBDEA', goals: [
            { key: 'visibility', label: 'Improve manager visibility', outcome: 'One view across conversion, persistency and service — with AI next steps.', journey: ['Data in', 'Live dashboards', 'AI insight', 'Next-best action', 'Decision'], primary: ['command'], supporting: ['quality'] }
          ] }
        ]
      },
      lending: {
        heroSub: 'Accelerate sourcing, lift application completion, support collections and cut servicing cost with AI agents for lending.',
        lifecycle: ['Lead', 'Qualify', 'Apply', 'Verify', 'Disburse', 'Collect', 'Service', 'Retain'],
        kpis: [ { l: 'Application completion', v: '78%', d: '▲ 4.2pp' }, { l: 'Sanction-to-disbursal', v: '62%', d: '▲ 2.0pp' }, { l: 'Collection effectiveness', v: '91%', d: '▲ 1.5pp' }, { l: 'Field productivity', v: '3.4/day', d: '▲ 0.3' } ],
        widgets: [
          { label: 'Sourcing funnel', sub: 'Lead · qualified · disbursed', bars: [['Leads', 92], ['Qualified', 61], ['Disbursed', 38]] },
          { label: 'Collections by bucket', sub: 'Bucket X · 30+ · 60+', bars: [['Bucket X', 93], ['30+', 68], ['60+', 41]] },
          { label: 'Application completion', sub: 'Start · filled · submitted', bars: [['Start', 100], ['Filled', 84], ['Submitted', 78]] },
          { label: 'Channel mix', sub: 'Voice · WhatsApp · field', bars: [['Voice', 52], ['WhatsApp', 31], ['Field', 17]] }
        ],
        goalCats: [
          { cat: 'Growth', color: '#19E08C', goals: [
            { key: 'sourcing', label: 'Increase sourcing conversion', outcome: 'Qualify more applicants and warm them to a disbursement.', journey: ['Lead', 'Qualify', 'Apply', 'Verify', 'Disbursed'], primary: ['voice', 'form'], supporting: ['whatsapp', 'command'] },
            { key: 'abandonment', label: 'Reduce application abandonment', outcome: 'Complete more loan applications with voice-assisted, validated capture.', journey: ['Application start', 'Voice-assisted fill', 'Auto-validate', 'Submitted', 'Approved'], primary: ['form', 'whatsapp'], supporting: ['command'] }
          ] },
          { cat: 'Operations', color: '#5FBDEA', goals: [
            { key: 'collections', label: 'Improve collections', outcome: 'Reach more borrowers pre-due and capture promise-to-pay at scale.', journey: ['Bucket assigned', 'AI reminder call', 'Promise-to-pay', 'Payment link', 'Confirmed'], primary: ['voice', 'whatsapp'], supporting: ['quality', 'command'] },
            { key: 'field', label: 'Improve field productivity', outcome: 'Give field & collections teams a co-pilot for every borrower visit.', journey: ['Visit assigned', 'Buddy preps', 'In-language pitch', 'Notes by voice', 'Next best action'], primary: ['field', 'voice'], supporting: ['command'] },
            { key: 'tat', label: 'Reduce turnaround time', outcome: 'Cut servicing TAT — resolve balance, statement and foreclosure on-thread.', journey: ['Query in', 'AI chat / WhatsApp', 'Resolved on thread', 'Escalate if needed', 'Closed'], primary: ['chat', 'whatsapp'], supporting: ['command'] }
          ] },
          { cat: 'Risk & Governance', color: '#19E08C', goals: [
            { key: 'callquality', label: 'Improve collections quality', outcome: 'Score 100% of collections calls for conduct and compliance.', journey: ['Call captured', '100% transcribed', 'CQI scored', 'Coaching', 'Re-tested'], primary: ['quality'], supporting: ['command'] }
          ] },
          { cat: 'Leadership', color: '#5FBDEA', goals: [
            { key: 'visibility', label: 'Improve manager visibility', outcome: 'One view across sourcing, collections and service — with AI next steps.', journey: ['Data in', 'Live dashboards', 'AI insight', 'Next-best action', 'Decision'], primary: ['command'], supporting: ['quality'] }
          ] }
        ]
      },
      cards: {
        heroSub: 'Grow card acquisition, activation, usage and retention with AI agents built for cardmember journeys.',
        lifecycle: ['Lead', 'Apply', 'Approve', 'Activate', 'First spend', 'Service', 'Retain'],
        kpis: [ { l: 'Approval rate', v: '44%', d: '▲ 1.1pp' }, { l: 'Activation rate', v: '73%', d: '▲ 5.0pp' }, { l: 'First spend · 30d', v: '68%', d: '▲ 4.4pp' }, { l: 'Retention · 12m', v: '89%', d: '▲ 0.9pp' } ],
        widgets: [
          { label: 'Acquisition funnel', sub: 'Applied · approved · activated', bars: [['Applied', 90], ['Approved', 44], ['Activated', 32]] },
          { label: 'Activation & spend', sub: 'Activated · first spend · repeat', bars: [['Activated', 73], ['First spend', 68], ['Repeat', 54]] },
          { label: 'Retention', sub: 'At-risk · saved · retained', bars: [['At-risk', 28], ['Saved', 61], ['Retained', 89]] },
          { label: 'Channel mix', sub: 'Voice · WhatsApp · human', bars: [['Voice', 40], ['WhatsApp', 45], ['Human', 15]] }
        ],
        goalCats: [
          { cat: 'Growth', color: '#19E08C', goals: [
            { key: 'approvals', label: 'Increase approvals', outcome: 'Qualify more prospects and convert approvals into active cards.', journey: ['Lead', 'Apply', 'Approve', 'Activate', 'First spend'], primary: ['voice', 'whatsapp'], supporting: ['command'] },
            { key: 'activation', label: 'Improve activation', outcome: 'Drive first spend and rewards adoption right after approval.', journey: ['Approved', 'Welcome nudge', 'First spend', 'Rewards set', 'Active'], primary: ['whatsapp', 'voice'], supporting: ['command'] },
            { key: 'firstspend', label: 'Increase first spend', outcome: 'Nudge new cardmembers to first transaction, fast.', journey: ['Card issued', 'WhatsApp nudge', 'Offer surfaced', 'First spend', 'Engaged'], primary: ['whatsapp'], supporting: ['voice', 'command'] }
          ] },
          { cat: 'Operations', color: '#5FBDEA', goals: [
            { key: 'service', label: 'Reduce servicing cost', outcome: 'Resolve statements, limits, rewards and disputes on-thread.', journey: ['Query in', 'AI chat / WhatsApp', 'Resolved on thread', 'Escalate if needed', 'Closed'], primary: ['chat', 'whatsapp'], supporting: ['command'] }
          ] },
          { cat: 'Risk & Governance', color: '#19E08C', goals: [
            { key: 'callquality', label: 'Improve call quality', outcome: 'Score 100% of cardmember calls and coach from real gaps.', journey: ['Call captured', '100% transcribed', 'CQI scored', 'Coaching', 'Re-tested'], primary: ['quality'], supporting: ['command'] }
          ] },
          { cat: 'Leadership', color: '#5FBDEA', goals: [
            { key: 'retention', label: 'Improve retention', outcome: 'Spot at-risk and upgrade-ready cardmembers and act early.', journey: ['Signal detected', 'Proactive outreach', 'Offer / save', 'Confirmed', 'Retained'], primary: ['voice', 'whatsapp'], supporting: ['quality', 'command'] },
            { key: 'visibility', label: 'Improve manager visibility', outcome: 'One view across approvals, activation and retention — with AI next steps.', journey: ['Data in', 'Live dashboards', 'AI insight', 'Next-best action', 'Decision'], primary: ['command'], supporting: ['quality'] }
          ] }
        ]
      }
    };
    const E = segExtra[seg] || segExtra.insurance;
    const goalCats = E.goalCats;
    const goalDefs = goalCats.reduce((acc, c) => acc.concat(c.goals), []);
    const recoFor = g => g.primary.concat(g.supporting);
    const selectGoal = (k, ag) => () => { this.setState({ goal: k }); this.addAgents(ag); };
    const goalGroups = goalCats.map(c => ({ cat: c.cat, color: c.color, goals: c.goals.map(g => ({ key: g.key, label: g.label, active: this.state.goal === g.key, inactive: this.state.goal !== g.key, onClick: selectGoal(g.key, recoFor(g)) })) }));
    const gCur = goalDefs.find(g => g.key === this.state.goal) || goalDefs[0];
    const mkAgent = k => idx[k] ? Object.assign({}, idx[k], { why: agentWhy[k] }) : null;
    const primaryAgents = gCur.primary.map(mkAgent).filter(Boolean);
    const supportingAgents = gCur.supporting.map(mkAgent).filter(Boolean);
    const goalOutcome = gCur.outcome;
    const journeyNodes = gCur.journey.map((label, i) => ({ label: label, notFirst: i > 0, last: i === gCur.journey.length - 1, notLast: i !== gCur.journey.length - 1 }));
    const segLabel = S.label;
    const heroSub = E.heroSub;
    const lifecycleNodes = E.lifecycle.map((label, i) => ({ label: label, notFirst: i > 0, last: i === E.lifecycle.length - 1, notLast: i !== E.lifecycle.length - 1 }));

    // command center
    const commandWidgets = E.widgets.map(w => ({ label: w.label, sub: w.sub, bars: w.bars.map(b => ({ l: b[0], v: b[1], fill: 'width: ' + b[1] + '%;' })) }));
    const kpis = E.kpis;
    const recs = [
      'Fatal error rate is down to 0.21% from 0.4% — call quality is trending to record lows.',
      '72% of trained agents improved within five days — expand the AI-led training cohort.',
      'Competition objection handling is stuck at 28% defect share — deploy refreshed counter-scripts to 34 Cat-B agents.',
      'Conversions are up 6.1% week-over-week — WhatsApp is now the fastest-growing channel.'
    ];
    const currentRec = recs[this.state.recIndex % recs.length];

    const ruleDefs = [
      { key: 'missed', label: 'Missed call → send a WhatsApp follow-up' },
      { key: 'noreply', label: 'No WhatsApp reply → retry by voice' },
      { key: 'resume', label: 'Application started → resume where the customer left off' },
      { key: 'escalate', label: 'High-value or sensitive → escalate to a human advisor' },
      { key: 'renewal', label: 'Due date near → trigger a renewal / EMI reminder' }
    ];
    const rulesList = ruleDefs.map(r => ({ key: r.key, label: r.label, on: !!this.state.rules[r.key], off: !this.state.rules[r.key], toggle: () => this.toggleRule(r.key) }));
    const mkRadio = (key, opts) => opts.map(o => ({ label: o, active: this.state[key] === o, inactive: this.state[key] !== o, onClick: () => this.setField(key, o) }));
    const mkMulti = (group, opts) => opts.map(o => ({ label: o, on: !!this.state[group][o], off: !this.state[group][o], toggle: () => this.toggleSet(group, o) }));
    const waTones = mkRadio('waTone', ['Formal', 'Professional', 'Conversational', 'Relationship Manager']);
    const waStyles = mkRadio('waStyle', ['Short & direct', 'Guided assistance', 'Educational', 'Sales-oriented']);
    const waLangs = mkMulti('waLangs', ['English', 'Hindi', 'Hinglish', 'Marathi', 'Tamil', 'Bengali']);
    const waRich = mkMulti('waRich', ['Buttons', 'Carousels', 'PDFs', 'Payment links', 'Voice notes']);
    const govDefs = [ { key: 'handoff', label: 'Human-handoff threshold' }, { key: 'prompts', label: 'Compliance prompts in-flow' }, { key: 'sources', label: 'Approved knowledge sources only' }, { key: 'escalation', label: 'Escalation triggers' }, { key: 'audit', label: 'Audit logging' } ];
    const govItems = govDefs.map(g => ({ key: g.key, label: g.label, on: !!this.state.govT[g.key], off: !this.state.govT[g.key], toggle: () => this.toggleSet('govT', g.key) }));
    const roleDefs = [ { key: 'ops', label: 'Operations Head', sees: ['Conversion funnel', 'SLA adherence', 'Productivity'] }, { key: 'sales', label: 'Sales Manager', sees: ['Lead status', 'Agent performance', 'Follow-up gaps'] }, { key: 'collections', label: 'Collections Manager', sees: ['PTP tracking', 'Recovery rates', 'Delinquency buckets'] }, { key: 'compliance', label: 'Compliance', sees: ['QA score', 'Audit findings', 'Regulatory alerts'] } ];
    const roleChips = roleDefs.map(r => ({ key: r.key, label: r.label, active: this.state.cmdRole === r.key, inactive: this.state.cmdRole !== r.key, onClick: () => this.setField('cmdRole', r.key) }));
    const roleCur = roleDefs.find(r => r.key === this.state.cmdRole) || roleDefs[0];
    const roleSees = roleCur.sees;
    const roleLabel = roleCur.label;

    return {
      S, segChips, heroAgents, groups,
      prompts, convo,
      selectedAgents, selectedCount: selectedAgents.length, hasSelection: selectedAgents.length > 0, noSelection: selectedAgents.length === 0,
      voices, sliders, qualitySteps, controls, stats, c8groups,
      goalGroups, goalLabel: gCur.label, goalOutcome, journeyNodes, segLabel, heroSub, lifecycleNodes, primaryAgents, supportingAgents,
      commandWidgets, currentRec, kpis, rulesList, waTones, waStyles, waLangs, waRich, govItems, roleChips, roleSees, roleLabel
    };
  }
}
