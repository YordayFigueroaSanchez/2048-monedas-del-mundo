const test = require("node:test");
const assert = require("node:assert/strict");
const AnimationState2048 = require("../../src/animation-state.js");
const GameState2048 = require("../../src/game-state.js");

test("buildVisualTransitions conserva metadatos slide y merge con duracion", function () {
    const transitions = AnimationState2048.buildVisualTransitions({
        transitions: [
            { value: 2, fromRow: 0, fromColumn: 0, toRow: 0, toColumn: 2, type: "slide" },
            { value: 2, fromRow: 0, fromColumn: 2, toRow: 0, toColumn: 3, type: "merge" }
        ]
    }, 260);

    assert.equal(transitions.length, 2);
    assert.equal(transitions[0].type, "slide");
    assert.equal(transitions[0].durationMs, 260);
    assert.equal(transitions[1].type, "merge");
});

test("buildVisualTransitions refleja una fusion coherente con el score del movimiento", function () {
    const moveResult = GameState2048.calculateMove([
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ], "left");
    const transitions = AnimationState2048.buildVisualTransitions(moveResult, 220);

    assert.equal(moveResult.scoreDelta, 4);
    assert.equal(transitions.length, 2);
    assert.deepEqual(transitions.map(function (transition) {
        return transition.type;
    }), ["merge", "merge"]);
    assert.deepEqual(transitions.map(function (transition) {
        return [transition.toRow, transition.toColumn];
    }), [[0, 0], [0, 0]]);
});

test("beginMove bloquea input hasta que completeMove libera el estado", function () {
    const initialState = AnimationState2048.createAnimationState({ durationMs: 220 });
    const runningState = AnimationState2048.beginMove(initialState, [{ tileId: "a" }], 100);
    const completedState = AnimationState2048.completeMove(runningState);

    assert.equal(AnimationState2048.canAcceptInput(initialState), true);
    assert.equal(AnimationState2048.canAcceptInput(runningState), false);
    assert.equal(AnimationState2048.canAcceptInput(completedState), true);
});

test("beginMove no activa animacion si no hay transiciones", function () {
    const initialState = AnimationState2048.createAnimationState({ durationMs: 220 });
    const runningState = AnimationState2048.beginMove(initialState, [], 100);

    assert.equal(runningState.isAnimating, false);
    assert.equal(runningState.activeMoveId, null);
});
