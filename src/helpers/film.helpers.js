export function filterFilmsByDirector(list, director) {
    if (director) {
        return (list.filter((film) => film.director === director));
    }
    else {
        return list;
    }
}

export function getListOf(list, prop) {
    return [...new Set(list.map((film) => film[prop] || ""))];
}

export function getFilmStats(list) {
    const filmStats = {
        avg_score: 0,
        acc_score: 0,
        total: 0,
        latest: 0,
    };

    filmStats.total = list.length;

    list.forEach((film) => {
        filmStats.acc_score += Number(film.rt_score);

        if(film.release_date > filmStats.latest) {
            filmStats.latest = film.release_date;
        }
    });

    filmStats.avg_score = filmStats.latest / filmStats.total;

    return filmStats;

}