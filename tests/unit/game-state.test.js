const test = require("node:test");
const assert = require("node:assert/strict");
const GameState2048 = require("../../src/game-state.js");

test("calculateMove fusiona una fila hacia la izquierda y suma score", function () {
    const board = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    const result = GameState2048.calculateMove(board, "left");

    assert.equal(result.changed, true);
    assert.equal(result.scoreDelta, 4);
    assert.deepEqual(result.board[0], [4, 0, 0, 0]);
    assert.deepEqual(result.mergedPositions, [{ row: 0, column: 0 }]);
});

test("calculateMove no cambia el tablero cuando el movimiento es invalido", function () {
    const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [2, 4, 8, 16],
        [32, 64, 128, 256]
    ];
    const result = GameState2048.calculateMove(board, "left");

    assert.equal(result.changed, false);
    assert.equal(result.scoreDelta, 0);
    assert.deepEqual(result.transitions, []);
    assert.deepEqual(result.board, board);
});

test("applyPlayerMove agrega una ficha nueva usando un random determinista", function () {
    const board = [
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    const sequence = [0, 0];
    const result = GameState2048.applyPlayerMove(board, "right", function () {
        return sequence.shift() ?? 0;
    });

    assert.equal(result.changed, true);
    assert.deepEqual(result.board[0], [2, 0, 0, 2]);
    assert.deepEqual(result.spawnPosition, { row: 0, column: 0 });
    assert.equal(result.spawnValue, 2);
    assert.deepEqual(result.spawnMeta, { row: 0, column: 0, value: 2 });
});

test("hasAvailableMoves detecta tableros sin movimientos disponibles", function () {
    const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 2, 4],
        [8, 16, 32, 64]
    ];

    assert.equal(GameState2048.hasAvailableMoves(board), false);
});
