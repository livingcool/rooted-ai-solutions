export const getStatusColor = (status: string) => {
    switch (status) {
        case 'Applied': return 'bg-blue-500/20 text-blue-400';
        case 'Resume Screened': return 'bg-purple-500/20 text-purple-400';
        case 'Communication Round': return 'bg-yellow-500/20 text-yellow-400';
        case 'Communication Round Completed': return 'bg-orange-500/20 text-orange-400';
        case 'Technical Round': return 'bg-cyan-500/20 text-cyan-400';
        case 'Technical Round Completed': return 'bg-indigo-500/20 text-indigo-400';
        case 'Final Interview': return 'bg-pink-500/20 text-pink-400';
        case 'Offer Sent': return 'bg-green-500/20 text-green-400';
        case 'Hired': return 'bg-emerald-500/20 text-emerald-400';
        case 'Rejected': return 'bg-red-500/20 text-red-400';
        default: return 'bg-white/10 text-white/60';
    }
};
