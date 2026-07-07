import type { Ersattningar } from "../types";

export function sortDates(ersattningar: Ersattningar[]) {
    const sortedDates = [...ersattningar].sort((a, b) => {
        return new Date(a.from).getTime() - new Date(b.from).getTime();
    });

    const result: Ersattningar[][] = [];
    let currentGroup: Ersattningar[] = [];

    for (let i = 0; i < sortedDates.length; i++) {
        const current = sortedDates[i];
        
        if (!current) continue;
        
        if (i === 0) {
            currentGroup.push(current);
        } else {
            const previous = sortedDates[i - 1];
            
            if (!previous) continue;

            const samePercentage = current.omfattning_procent === previous.omfattning_procent;

            const nextDay = new Date(previous.tom);
            nextDay.setDate(nextDay.getDate() + 1);

            const currentFromTime = new Date(current.from).getTime();
            const isConsecutive = nextDay.getTime() === currentFromTime;

            if (samePercentage && isConsecutive) {
                currentGroup.push(current);
            } else {
                result.push(currentGroup);
                currentGroup = [current];
            }
        }
    }

    if (currentGroup.length > 0) {
        result.push(currentGroup);
    }

    return result;
};