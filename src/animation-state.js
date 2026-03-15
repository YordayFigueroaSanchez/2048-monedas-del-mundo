(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.AnimationState2048 = factory();
    }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    function createAnimationState(options) {
        var config = options || {};

        return {
            durationMs: config.durationMs || 300,
            spawnDurationMs: config.spawnDurationMs || 200,
            isAnimating: false,
            phase: "idle",
            activeMoveId: null,
            spawnEvent: null,
            startedAt: 0,
            nextMoveId: 1
        };
    }

    function buildVisualTransitions(moveResult, durationMs) {
        var duration = durationMs || 300;

        return (moveResult.transitions || []).map(function (transition, index) {
            return {
                tileId: "transition-" + (index + 1),
                value: transition.value,
                fromRow: transition.fromRow,
                fromColumn: transition.fromColumn,
                toRow: transition.toRow,
                toColumn: transition.toColumn,
                type: transition.type,
                durationMs: duration
            };
        });
    }

    function beginMove(state, transitions, now) {
        var time = typeof now === "number" ? now : Date.now();
        var items = transitions || [];

        if (!items.length) {
            return Object.assign({}, state, {
                isAnimating: false,
                phase: "idle",
                activeMoveId: null,
                spawnEvent: null,
                startedAt: 0
            });
        }

        return Object.assign({}, state, {
            isAnimating: true,
            phase: "moving",
            activeMoveId: "move-" + state.nextMoveId,
            spawnEvent: null,
            startedAt: time,
            nextMoveId: state.nextMoveId + 1
        });
    }

    function buildSpawnEvent(moveResult, state, options) {
        var config = options || {};
        var reducedMotion = Boolean(config.reducedMotion);
        var spawnDuration = typeof config.spawnDurationMs === "number"
            ? config.spawnDurationMs
            : (typeof state.spawnDurationMs === "number" ? state.spawnDurationMs : 200);

        if (!moveResult || !moveResult.changed || !moveResult.spawnPosition) {
            return null;
        }

        return {
            moveId: state.activeMoveId,
            row: moveResult.spawnPosition.row,
            column: moveResult.spawnPosition.column,
            value: moveResult.spawnValue,
            phase: reducedMotion ? "resolved" : "roulette",
            reducedMotion: reducedMotion,
            durationMs: reducedMotion ? 0 : spawnDuration
        };
    }

    function beginSpawn(state, spawnEvent, now) {
        var time = typeof now === "number" ? now : Date.now();

        if (!spawnEvent) {
            return completeMove(state);
        }

        return Object.assign({}, state, {
            isAnimating: true,
            phase: "spawning",
            spawnEvent: spawnEvent,
            startedAt: time
        });
    }

    function completeMove(state) {
        return Object.assign({}, state, {
            isAnimating: false,
            phase: "idle",
            activeMoveId: null,
            spawnEvent: null,
            startedAt: 0
        });
    }

    function completeSpawning(state) {
        return completeMove(state);
    }

    function canAcceptInput(state) {
        return !state.isAnimating;
    }

    function getPhase(state) {
        return state.phase;
    }

    return {
        beginSpawn: beginSpawn,
        buildSpawnEvent: buildSpawnEvent,
        beginMove: beginMove,
        buildVisualTransitions: buildVisualTransitions,
        canAcceptInput: canAcceptInput,
        completeSpawning: completeSpawning,
        completeMove: completeMove,
        createAnimationState: createAnimationState,
        getPhase: getPhase
    };
}));
