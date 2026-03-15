const test = require("node:test");
const assert = require("node:assert/strict");
const GameState2048 = require("../../src/game-state.js");
const AnimationState2048 = require("../../src/animation-state.js");
const BoardRenderer2048 = require("../../src/board-renderer.js");

test("no crea evento de ruleta en movimiento invalido", function () {
    const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [2, 4, 8, 16],
        [32, 64, 128, 256]
    ];
    const moveResult = GameState2048.applyPlayerMove(board, "left", function () {
        return 0;
    });
    const idleState = AnimationState2048.createAnimationState({ durationMs: 300, spawnDurationMs: 200 });
    const event = AnimationState2048.buildSpawnEvent(moveResult, idleState, { reducedMotion: false });

    assert.equal(moveResult.changed, false);
    assert.equal(event, null);
});

test("crea evento de ruleta en jugada valida con nueva ficha", function () {
    const board = [
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    const sequence = [0, 0];
    const moveResult = GameState2048.applyPlayerMove(board, "right", function () {
        return sequence.shift() ?? 0;
    });
    const movingState = AnimationState2048.beginMove(
        AnimationState2048.createAnimationState({ durationMs: 300, spawnDurationMs: 200 }),
        [{ tileId: "transition-1" }],
        10
    );
    const event = AnimationState2048.buildSpawnEvent(moveResult, movingState, {
        reducedMotion: false,
        spawnDurationMs: 200
    });

    assert.equal(moveResult.changed, true);
    assert.deepEqual(event, {
        moveId: "move-1",
        row: 0,
        column: 0,
        value: 2,
        phase: "roulette",
        reducedMotion: false,
        durationMs: 200
    });
});

test("la secuencia de ruleta es determinista por moveId y termina en spawnValue", function () {
    const first = BoardRenderer2048.buildSpawnRouletteSequence(4, "move-4");
    const second = BoardRenderer2048.buildSpawnRouletteSequence(4, "move-4");
    const third = BoardRenderer2048.buildSpawnRouletteSequence(4, "move-5");

    assert.deepEqual(first, second);
    assert.notDeepEqual(first, third);
    assert.equal(first[first.length - 1], 4);
    assert.equal(third[third.length - 1], 4);
});