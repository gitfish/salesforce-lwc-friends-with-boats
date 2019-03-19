const not = (pr) => {
    return (value, idx, source) => {
        return !pr(value, idx, source);
    };
};

const and = (...prs) => {
    return (value, idx, source) => {
        return prs.every(pr => {
            return pr(value, idx, source);
        });
    };
};

const or = (...prs) => {
    return (value, idx, source) => {
        return prs.some(pr => {
            return pr(value, idx, source);
        });
    };
};

export { not, and, or }