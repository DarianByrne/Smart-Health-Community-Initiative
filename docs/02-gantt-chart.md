# Project Gantt Chart

> **Purpose:** A schedule of the actual _tasks_ — their durations, order, and dependencies. This is where planning meets reality: set your plan, then keep it honest by marking tasks `done`/`active` and adjusting dates as things move.
>
> **Update:** Fortnightly (or whenever tasks start/finish). Pull the task list from your **shared meeting sheet**.

**Last updated:** _YYYY-MM-DD_ · **Maintained by:** _\<Your name\>_

---

## Schedule

_Edit the sections and tasks below. Syntax reference is at the bottom of this file._

```mermaid
gantt
    title <Project Title> — Gantt Chart
    dateFormat  YYYY-MM-DD
    axisFormat  %d %b
    excludes    weekends
    todayMarker stroke-width:2px,stroke:#ff5252,opacity:0.6

    section Planning
    Project kickoff            :milestone, m1, 2026-01-12, 0d
    Literature review          :done,    pl1, 2026-01-12, 14d
    Requirements specification :active,  pl2, after pl1, 10d
    Proposal submission        :milestone, m2, after pl2, 0d

    section Design
    System design              :         ds1, after pl2, 12d
    Design review w/ supervisor:crit,    ds2, after ds1, 2d

    section Implementation
    Setup & scaffolding        :         im1, after ds2, 5d
    Core feature A             :         im2, after im1, 14d
    Core feature B             :         im3, after im2, 14d
    Integration                :         im4, after im3, 7d

    section Evaluation
    Testing                    :         ev1, after im4, 10d
    Evaluation & analysis      :         ev2, after ev1, 7d

    section Delivery
    Dissertation write-up      :         dl1, after ev1, 21d
    Final submission           :milestone, m3, after dl1, 0d
```
