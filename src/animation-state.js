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
            isAnimating: false,
            activeMoveId: null,
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
                activeMoveId: null,
                startedAt: 0
            });
        }

        return Object.assign({}, state, {
            isAnimating: true,
            activeMoveId: "move-" + state.nextMoveId,
            startedAt: time,
            nextMoveId: state.nextMoveId + 1
        });
    }

    function completeMove(state) {
        return Object.assign({}, state, {
            isAnimating: false,
            activeMoveId: null,
            startedAt: 0
        });
    }

    function canAcceptInput(state) {
        return !state.isAnimating;
    }

    return {
        beginMove: beginMove,
        buildVisualTransitions: buildVisualTransitions,
        canAcceptInput: canAcceptInput,
        completeMove: completeMove,
        createAnimationState: createAnimationState
    };
}));
