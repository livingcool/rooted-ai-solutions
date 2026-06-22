import React from 'react';

const LOCATIONS = ["Hosur", "Bangalore", "Chennai", "Coimbatore", "Hyderabad", "Salem"];
const SERVICES = ["AI Vision", "Robotics Perception", "Agentic AI", "Process Automation", "Document Intelligence"];

export default function LocationFooter() {
  return (
    <div className="bg-[#240747] border-t border-zinc-800/50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
          <div>
            <h4 className="font-mono text-[0.6rem] text-[#F6851B] uppercase tracking-[0.2em] mb-4">Service Areas</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {LOCATIONS.map(loc => (
                <span key={loc} className="text-zinc-500 text-[0.7rem] font-sans">
                  AI Solutions in {loc}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-mono text-[0.6rem] text-[#F6851B] uppercase tracking-[0.2em] mb-4">Strategic Intent</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {SERVICES.map(service => (
                LOCATIONS.slice(0, 3).map(loc => (
                  <span key={`${service}-${loc}`} className="text-zinc-600 text-[0.65rem] font-sans">
                    {service} {loc}
                  </span>
                ))
              ))}
              <span className="text-zinc-600 text-[0.65rem] font-sans italic">
                Strategic AI Engineering for industrial operations across South India.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
