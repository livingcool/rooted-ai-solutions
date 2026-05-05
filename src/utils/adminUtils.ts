export const getStatusColor = (status: string) => {
    const base = "px-2 py-0.5 border-2 border-[#240747] text-[#240747] text-[0.6rem] font-bold uppercase tracking-widest rounded-md shadow-[2px_2px_0_#240747]";
    switch (status) {
        case 'Applied': return `${base} bg-blue-300`;
        case 'Resume Screened': return `${base} bg-purple-300`;
        case 'Communication Round': return `${base} bg-yellow-300`;
        case 'Communication Round Completed': return `${base} bg-orange-300`;
        case 'Technical Round': return `${base} bg-cyan-300`;
        case 'Technical Round Completed': return `${base} bg-indigo-300`;
        case 'Final Interview': return `${base} bg-pink-300`;
        case 'Offer Sent': return `${base} bg-green-300`;
        case 'Hired': return `${base} bg-emerald-400`;
        case 'Rejected': return `${base} bg-red-400`;
        default: return `${base} bg-white`;
    }
};
