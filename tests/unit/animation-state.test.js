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
    const initialState = AnimationState2048.createAnimationState({ durationMs: 220, spawnDurationMs: 200 });
    const runningState = AnimationState2048.beginMove(initialState, [{ tileId: "a" }], 100);
    const spawnState = AnimationState2048.beginSpawn(runningState, {
        moveId: "move-1",
        row: 0,
        column: 0,
        value: 2,
        phase: "roulette",
        reducedMotion: false,
        durationMs: 200
    }, 150);
    const completedSpawn = AnimationState2048.completeSpawning(spawnState);
    const completedState = AnimationState2048.completeMove(runningState);

    assert.equal(AnimationState2048.canAcceptInput(initialState), true);
    assert.equal(AnimationState2048.canAcceptInput(runningState), false);
    assert.equal(AnimationState2048.getPhase(spawnState), "spawning");
    assert.equal(AnimationState2048.canAcceptInput(spawnState), false);
    assert.equal(AnimationState2048.canAcceptInput(completedSpawn), true);
    assert.equal(AnimationState2048.canAcceptInput(completedState), true);
});

test("beginMove no activa animacion si no hay transiciones", function () {
    const initialState = AnimationState2048.createAnimationState({ durationMs: 220 });
    const runningState = AnimationState2048.beginMove(initialState, [], 100);

    assert.equal(runningState.isAnimating, false);
    assert.equal(runningState.activeMoveId, null);
});

test("buildSpawnEvent crea evento solo para jugadas validas con spawn", function () {
    const state = AnimationState2048.beginMove(
        AnimationState2048.createAnimationState({ durationMs: 300, spawnDurationMs: 200 }),
        [{ tileId: "x" }],
        10
    );
    const event = AnimationState2048.buildSpawnEvent({
        changed: true,
        spawnPosition: { row: 1, column: 2 },
        spawnValue: 4
    }, state, { reducedMotion: false, spawnDurationMs: 190 });

    assert.deepEqual(event, {
        moveId: "move-1",
        row: 1,
        column: 2,
        value: 4,
        phase: "roulette",
        reducedMotion: false,
        durationMs: 190
    });
});

test("buildSpawnEvent en reduced-motion resuelve con duracion cero", function () {
    const state = AnimationState2048.beginMove(
        AnimationState2048.createAnimationState({ durationMs: 300, spawnDurationMs: 200 }),
        [{ tileId: "x" }],
        10
    );
    const event = AnimationState2048.buildSpawnEvent({
        changed: true,
        spawnPosition: { row: 2, column: 1 },
        spawnValue: 2
    }, state, { reducedMotion: true, spawnDurationMs: 190 });

    assert.equal(event.durationMs, 0);
    assert.equal(event.phase, "resolved");
});
