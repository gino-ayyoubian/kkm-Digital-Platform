import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  shortBio: string;
  fullBio: string;
  education: string[];
  keyMilestones: string[];
  patentsCount?: number;
  emailContact?: string;
  linkedInUrl?: string;
  quote?: string;
}

export const LEADERSHIP_PROFILES: LeaderProfile[] = [
  {
    id: 'gino-ayyoubian',
    name: 'Gino Ayyoubian',
    role: 'Chief Executive Officer',
    department: 'Executive Leadership',
    image: 'https://i.imgur.com/lJ4n79b.jpeg',
    shortBio: '15+ years in EPCI, High-Tech Integration & Strategic Management.',
    fullBio: 'Gino Ayyoubian is the Chief Executive Officer of KKM International Group. Over a career spanning more than two decades, he has architected cross-border energy consortia, steered high-stakes sovereign infrastructure agreements, and championed deep geothermal as the world’s most reliable zero-carbon baseload energy source. Under his stewardship, KKM expanded from a specialized thermodynamic engineering practice into an international multi-disciplinary enterprise delivering patented closed-loop geothermal (GMEL), thermal spallation drilling, and smart industrial infrastructure.',
    education: ['M.Sc. Thermodynamic Engineering', 'Executive Leadership Program (AMP), INSEAD', 'B.Sc. Mechanical Engineering'],
    keyMilestones: ['Architected the commercialization of KKM’s proprietary GMEL closed-loop thermal recovery ecosystem.', 'Secured strategic EPCI concessions with regional sovereign utilities and private industrial operators.', 'Keynote speaker at the World Geothermal Congress and Global Clean Energy Ministerial.'],
    patentsCount: 8, emailContact: 'g.ayyoubian@kkm.co', linkedInUrl: 'https://linkedin.com',
    quote: 'Sustainable energy cannot depend on intermittent weather patterns. By tapping the boundless heat beneath our feet with zero surface fluid loss, we secure humanity’s energy future forever.'
  },
  {
    id: 'reza-asakereh', name: 'Dr. Reza Asakereh', role: 'Chief Technology Officer', department: 'AI & Digital Innovation',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Directs KKM’s subsurface Digital Twin platform, AI, and digital innovation systems.',
    fullBio: 'Dr. Reza Asakereh directs KKM’s digital transformation, AI integration, and real-time subsurface modeling platforms. He leads the development of the proprietary KKM Digital Twin engine, which couples real-time data with physics-informed neural networks to forecast reservoir thermal decay and optimize generator feed-in tariffs in milliseconds.',
    education: ['Ph.D. Computational Physics & AI', 'M.Sc. Computer Science', 'B.Sc. Electrical Engineering'],
    keyMilestones: ['Architected the KKM Digital Twin real-time reservoir visualization platform.', 'Engineered edge-compute telematics nodes for high-temperature environments.', 'Fellow of the Institute of Electrical and Electronics Engineers (IEEE).'],
    patentsCount: 9, emailContact: 'r.asakereh@kkm.co', linkedInUrl: 'https://linkedin.com',
    quote: 'We transform invisible subsurface thermodynamics into predictive, interactive digital twins that empower autonomous power plant dispatch.'
  },
  {
    id: 'khosro-jarrahian', name: 'Dr. Khosro Jarrahian', role: 'Chief Science Officer', department: 'R&D & Sustainability',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Leads global R&D, sustainability research, and thermodynamics engineering division.',
    fullBio: 'Dr. Khosro Jarrahian leads the global R&D and engineering division at KKM. With deep expertise in supercritical fluid mechanics, downhole heat transfer, and binary Organic Rankine Cycles (ORC), he is a lead scientific architect behind the GMEL Closed-Loop Geothermal (CLG) system. His peer-reviewed research on non-condensable gas elimination and downhole thermodynamic equilibrium has been widely cited.',
    education: ['Ph.D. Thermal Power Engineering', 'M.S. Fluid Dynamics & Heat Transfer', 'B.Sc. Applied Physics'],
    keyMilestones: ['Primary inventor on international geothermal binary cycle and coaxial wellbore patents.', 'Led the thermal simulation campaign achieving 98.6% cycle retention in sub-surface heat exchange.', 'Advisory Board Member for global energy initiatives.'],
    patentsCount: 17, emailContact: 'k.jarrahian@kkm.co', linkedInUrl: 'https://linkedin.com',
    quote: 'Thermodynamics is uncompromising. By eliminating open-reservoir depletion and designing mathematically sealed secondary loops, we extract immense power with near-zero environmental disturbance.'
  },
  {
    id: 'farid-imani', name: 'Farid Imani', role: 'Chief Investment Officer', department: 'Assets & Acquisitions',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Directs global assets, strategic acquisitions, and capital investments across the energy portfolio.',
    fullBio: 'Farid Imani oversees KKM’s international asset portfolio, managing investments, strategic acquisitions, and sovereign partnerships. He has successfully negotiated multi-jurisdictional concession contracts, bilateral energy treaties, and secured critical funding for multi-megawatt EPCI infrastructure projects globally.',
    education: ['MBA, Strategic Management', 'M.Sc. Finance', 'B.Sc. Economics'],
    keyMilestones: ['Structured government-to-business (G2B) geothermal power purchase agreements (PPAs).', 'Led the acquisition and integration of key sustainable energy startups.', 'Established the KKM Investment Framework for global partners.'],
    patentsCount: 2, emailContact: 'f.imani@kkm.co', linkedInUrl: 'https://linkedin.com',
    quote: 'Capital deployed effectively into sustainable infrastructure yields not just financial returns, but generational resilience.'
  },
  {
    id: 'pedram-abdarzadeh', name: 'Dr. Pedram Abdarzadeh', role: 'Chief Financial Officer', department: 'Finance & Capital Planning',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Leads finance, capital planning, and corporate fiscal strategy.',
    fullBio: 'Dr. Pedram Abdarzadeh directs KKM’s financial strategy, capital allocation, and risk management. Ensuring fiscal responsibility across all international projects, he bridges the gap between ambitious engineering deployments and sustainable economic modeling, securing the financial bedrock for KKM’s rapid global expansion.',
    education: ['Ph.D. Economics', 'M.Sc. Financial Engineering', 'Certified Public Accountant (CPA)'],
    keyMilestones: ['Secured AA ESG benchmark rating from leading international credit agencies.', 'Managed a capital deployment portfolio exceeding $2B for global infrastructure.', 'Authored the annual KKM Corporate Financial & Decarbonization Audit.'],
    patentsCount: 0, emailContact: 'p.abdarzadeh@kkm.co', linkedInUrl: 'https://linkedin.com',
    quote: 'True financial sustainability means aligning long-term capital with the fundamental needs of our planet and society.'
  },
  {
    id: 'heidar-yarveicy', name: 'Heidar Yarveicy', role: 'Chief Operating Officer', department: 'Operations & Systems',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Directs operations, systems, and turnkey industrial infrastructure deployment globally.',
    fullBio: 'Heidar Yarveicy oversees KKM’s global project delivery, procurement logistics, and field operational systems. With decades of experience in operations management, he specializes in high-pressure drilling operations, modular surface plant construction, and fast-track EPCI delivery under stringent compliance and safety standards.',
    education: ['M.Sc. Industrial Engineering', 'Executive Program in Operations Strategy', 'B.Sc. Civil Engineering'],
    keyMilestones: ['Delivered over 50 major turnkey infrastructure installations with exceptional safety records.', 'Pioneered modular standardized operations that reduced deployment lead times by 38%.', 'Oversees a multi-disciplinary international field team of hundreds of engineers.'],
    patentsCount: 3, emailContact: 'h.yarveicy@kkm.co', linkedInUrl: 'https://linkedin.com',
    quote: 'Operational discipline is our safety margin. Flawless execution is the only metric that protects both our people and our projects.'
  },
  {
    id: 'salar-hashemi', name: 'Dr. Salar Hashemi', role: 'Director of Energy Systems', department: 'Energy Systems',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Grid integration & optimization.',
    fullBio: 'Dr. Salar Hashemi specializes in grid integration, smart energy routing, and systems optimization, bridging deep geothermal production with large-scale utility distributions.',
    education: ['Ph.D. Electrical Engineering'], keyMilestones: [], patentsCount: 0, emailContact: 's.hashemi@kkm.co', linkedInUrl: 'https://linkedin.com'
  },
  {
    id: 'mahdi-ghiasy', name: 'Mahdi Ghiasy', role: 'Director of BIM', department: 'Digital Twins',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Digital twins & construction tech.',
    fullBio: 'Mahdi Ghiasy leads the implementation of Building Information Modeling (BIM), driving construction efficiency and facility management optimization.',
    education: ['M.Sc. Construction Management'], keyMilestones: [], patentsCount: 0, emailContact: 'm.ghiasy@kkm.co', linkedInUrl: 'https://linkedin.com'
  },
  {
    id: 'ashkan-tofangchiha', name: 'Ashkan Tofangchiha', role: 'QA/QC Manager', department: 'Quality Assurance',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Quality assurance & standards.',
    fullBio: 'Ashkan Tofangchiha ensures strict adherence to international quality and engineering standards across all levels of KKM’s EPCI operations.',
    education: ['B.Sc. Industrial Engineering'], keyMilestones: [], patentsCount: 0, emailContact: 'a.tofangchiha@kkm.co', linkedInUrl: 'https://linkedin.com'
  },
  {
    id: 'mostafa-sharifi', name: 'Mostafa Sharifi', role: 'OpEx Manager', department: 'Operations',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Operational excellence.',
    fullBio: 'Mostafa Sharifi drives operational excellence initiatives, streamlining processes and enhancing efficiency in complex infrastructural projects.',
    education: ['MBA'], keyMilestones: [], patentsCount: 0, emailContact: 'm.sharifi@kkm.co', linkedInUrl: 'https://linkedin.com'
  },
  {
    id: 'badie-razi', name: 'Badie Razi', role: 'Director of Process', department: 'Process Engineering',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Process engineering.',
    fullBio: 'Badie Razi oversees core process engineering workflows, thermodynamic system design, and large-scale plant operation parameters.',
    education: ['M.Sc. Chemical Engineering'], keyMilestones: [], patentsCount: 0, emailContact: 'b.razi@kkm.co', linkedInUrl: 'https://linkedin.com'
  },
  {
    id: 'masoumeh-moshar', name: 'Masoumeh Moshar', role: 'Director of PR', department: 'Public Relations',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Public relations.',
    fullBio: 'Masoumeh Moshar leads public relations, corporate communications, and media strategy for KKM International Group globally.',
    education: ['M.A. Communications'], keyMilestones: [], patentsCount: 0, emailContact: 'm.moshar@kkm.co', linkedInUrl: 'https://linkedin.com'
  },
  {
    id: 'hamed-zatajam', name: 'Hamed Zatajam', role: 'Director of Legal', department: 'Legal',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Legal affairs.',
    fullBio: 'Hamed Zatajam serves as the primary legal counsel, managing corporate affairs, intellectual property, and international contracts.',
    education: ['J.D. Law'], keyMilestones: [], patentsCount: 0, emailContact: 'h.zatajam@kkm.co', linkedInUrl: 'https://linkedin.com'
  },
  {
    id: 'seyed-jasem-hosseini', name: 'Seyed Jasem Hosseini', role: 'Director of HSE', department: 'HSE',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Health, Safety & Environment.',
    fullBio: 'Seyed Jasem Hosseini develops and enforces all occupational health, safety protocols, and environmental standards across field operations.',
    education: ['M.Sc. Occupational Safety'], keyMilestones: [], patentsCount: 0, emailContact: 's.hosseini@kkm.co', linkedInUrl: 'https://linkedin.com'
  },
  {
    id: 'masoumeh-einabadi', name: 'Dr. Masoumeh Einabadi', role: 'Head of Biomedical', department: 'Biomedical',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Medical research.',
    fullBio: 'Dr. Masoumeh Einabadi directs advanced biomedical research initiatives and cross-disciplinary innovations at the intersection of energy and healthcare.',
    education: ['Ph.D. Biomedical Engineering'], keyMilestones: [], patentsCount: 0, emailContact: 'm.einabadi@kkm.co', linkedInUrl: 'https://linkedin.com'
  },
  {
    id: 'sina-ayyoubian', name: 'Sina Ayyoubian', role: 'R&D Specialist', department: 'R&D',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Innovation projects & Youth Ambassador.',
    fullBio: 'Sina Ayyoubian focuses on deep-tech innovation projects and represents KKM as its Youth Ambassador for next-gen outreach.',
    education: ['B.Sc. Engineering'], keyMilestones: [], patentsCount: 0, emailContact: 's.ayyoubian@kkm.co', linkedInUrl: 'https://linkedin.com'
  },
  {
    id: 'reza-baghdadchi', name: 'Dr. Reza Baghdadchi', role: 'Regulatory Advisor', department: 'Policy',
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d14b3014?auto=format&fit=crop&w=400&q=80',
    shortBio: 'Policy & compliance.',
    fullBio: 'Dr. Reza Baghdadchi guides KKM through complex international regulatory landscapes and environmental policy frameworks.',
    education: ['Ph.D. Public Policy'], keyMilestones: [], patentsCount: 0, emailContact: 'r.baghdadchi@kkm.co', linkedInUrl: 'https://linkedin.com'
  }
];

export const LeadershipTeam: React.FC = () => {

  return (
    <section id="leadership-team-section" className="py-16 bg-slate-50 dark:bg-slate-900/60 transition-colors border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            <span>🏛️ Executive & Technical Governance</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Leadership Team & Scientific Directorate
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            Distinguished leaders in thermodynamic engineering, global EPCI mega-projects, computational geophysics, and sovereign energy diplomacy.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEADERSHIP_PROFILES.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative h-96 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-500 cursor-default"
            >
              {/* Front of Card (Visible normally) */}
              <div className="absolute inset-0 flex flex-col justify-between z-10 p-6 transition-opacity duration-300 group-hover:opacity-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="absolute inset-0 w-full h-full object-cover object-center -z-10"
                  loading="lazy"
                />
                <div className="self-start">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-primary/90 text-white backdrop-blur-sm shadow">
                    {leader.department}
                  </span>
                </div>
                <div className="text-white">
                  <h3 className="font-display font-extrabold text-2xl drop-shadow-md">
                    {leader.name}
                  </h3>
                  <p className="text-sm font-semibold text-secondary uppercase tracking-wide drop-shadow-md">
                    {leader.role}
                  </p>
                </div>
              </div>

              {/* Hover Overlay (Revealed on hover) */}
              <div className="absolute inset-0 bg-white dark:bg-slate-800 p-6 z-20 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-y-auto">
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-primary dark:text-secondary mt-1 uppercase tracking-wide">
                  {leader.role}
                </p>
                
                <div className="mt-4 space-y-3 flex-grow">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {leader.shortBio}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {leader.fullBio}
                  </p>
                  
                  {leader.keyMilestones.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                      <ul className="space-y-1.5">
                        {leader.keyMilestones.slice(0, 2).map((milestone, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                            <span>{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-1.5">
                  {leader.education.slice(0, 2).map((edu, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-[10px] font-semibold"
                    >
                      🎓 {edu}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
