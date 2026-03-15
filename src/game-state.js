(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.GameState2048 = factory();
    }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    function createEmptyBoard(size) {
        var boardSize = size || 4;
        return Array.from({ length: boardSize }, function () {
            return Array(boardSize).fill(0);
        });
    }

    function cloneBoard(board) {
        return board.map(function (row) {
            return row.slice();
        });
    }

    function getEmptyCells(board) {
        var cells = [];

        board.forEach(function (row, rowIndex) {
            row.forEach(function (value, columnIndex) {
                if (value === 0) {
                    cells.push({ row: rowIndex, column: columnIndex });
                }
            });
        });

        return cells;
    }

    function spawnRandomTile(board, randomFn) {
        var rng = randomFn || Math.random;
        var nextBoard = cloneBoard(board);
        var emptyCells = getEmptyCells(nextBoard);
        var randomIndex;
        var cell;
        var value;

        if (!emptyCells.length) {
            return {
                board: nextBoard,
                position: null,
                value: null
            };
        }

        randomIndex = Math.floor(rng() * emptyCells.length);
        cell = emptyCells[randomIndex];
        value = rng() < 0.9 ? 2 : 4;
        nextBoard[cell.row][cell.column] = value;

        return {
            board: nextBoard,
            position: { row: cell.row, column: cell.column },
            value: value
        };
    }

    function getLineConfig(direction, index, size) {
        switch (direction) {
        case "left":
            return {
                values: Array.from({ length: size }, function (_, lineIndex) {
                    return { row: index, column: lineIndex };
                })
            };
        case "right":
            return {
                values: Array.from({ length: size }, function (_, lineIndex) {
                    return { row: index, column: size - 1 - lineIndex };
                })
            };
        case "up":
            return {
                values: Array.from({ length: size }, function (_, lineIndex) {
                    return { row: lineIndex, column: index };
                })
            };
        case "down":
            return {
                values: Array.from({ length: size }, function (_, lineIndex) {
                    return { row: size - 1 - lineIndex, column: index };
                })
            };
        default:
            throw new Error("Unsupported direction: " + direction);
        }
    }

    function collapseLine(values) {
        var entries = values
            .map(function (value, index) {
                return { value: value, sourceIndex: index };
            })
            .filter(function (entry) {
                return entry.value !== 0;
            });
        var result = [];
        var transitions = [];
        var mergedTargets = [];
        var scoreDelta = 0;
        var cursor = 0;
        var targetIndex = 0;

        while (cursor < entries.length) {
            var current = entries[cursor];
            var next = entries[cursor + 1];

            if (next && next.value === current.value) {
                result.push(current.value * 2);
                scoreDelta += current.value * 2;
                mergedTargets.push({ index: targetIndex, value: current.value * 2 });
                transitions.push({
                    value: current.value,
                    fromIndex: current.sourceIndex,
                    toIndex: targetIndex,
                    type: "merge"
                });
                transitions.push({
                    value: next.value,
                    fromIndex: next.sourceIndex,
                    toIndex: targetIndex,
                    type: "merge"
                });
                cursor += 2;
            } else {
                result.push(current.value);
                transitions.push({
                    value: current.value,
                    fromIndex: current.sourceIndex,
                    toIndex: targetIndex,
                    type: "slide"
                });
                cursor += 1;
            }

            targetIndex += 1;
        }

        while (result.length < values.length) {
            result.push(0);
        }

        return {
            line: result,
            transitions: transitions,
            mergedTargets: mergedTargets,
            scoreDelta: scoreDelta,
            changed: result.some(function (value, index) {
                return value !== values[index];
            })
        };
    }

    function calculateMove(board, direction) {
        var size = board.length;
        var nextBoard = createEmptyBoard(size);
        var transitions = [];
        var mergedPositions = [];
        var changed = false;
        var scoreDelta = 0;

        for (var lineIndex = 0; lineIndex < size; lineIndex += 1) {
            var config = getLineConfig(direction, lineIndex, size).values;
            var values = config.map(function (position) {
                return board[position.row][position.column];
            });
            var collapsed = collapseLine(values);

            collapsed.line.forEach(function (value, valueIndex) {
                var targetCell = config[valueIndex];
                nextBoard[targetCell.row][targetCell.column] = value;
            });

            collapsed.transitions.forEach(function (transition) {
                var fromCell = config[transition.fromIndex];
                var toCell = config[transition.toIndex];

                if (transition.type === "merge" || transition.fromIndex !== transition.toIndex) {
                    transitions.push({
                        value: transition.value,
                        fromRow: fromCell.row,
                        fromColumn: fromCell.column,
                        toRow: toCell.row,
                        toColumn: toCell.column,
                        type: transition.type
                    });
                }
            });

            collapsed.mergedTargets.forEach(function (mergedTarget) {
                var mergedCell = config[mergedTarget.index];
                mergedPositions.push({ row: mergedCell.row, column: mergedCell.column });
            });

            changed = changed || collapsed.changed;
            scoreDelta += collapsed.scoreDelta;
        }

        return {
            board: changed ? nextBoard : cloneBoard(board),
            changed: changed,
            scoreDelta: scoreDelta,
            transitions: changed ? transitions : [],
            mergedPositions: changed ? mergedPositions : []
        };
    }

    function applyPlayerMove(board, direction, randomFn) {
        var moveResult = calculateMove(board, direction);
        var spawnResult;

        if (!moveResult.changed) {
            return {
                board: cloneBoard(board),
                changed: false,
                scoreDelta: 0,
                transitions: [],
                mergedPositions: [],
                spawnPosition: null,
                spawnValue: null
            };
        }

        spawnResult = spawnRandomTile(moveResult.board, randomFn);

        return {
            board: spawnResult.board,
            changed: true,
            scoreDelta: moveResult.scoreDelta,
            transitions: moveResult.transitions,
            mergedPositions: moveResult.mergedPositions,
            spawnPosition: spawnResult.position,
            spawnValue: spawnResult.value,
            spawnMeta: spawnResult.position ? {
                row: spawnResult.position.row,
                column: spawnResult.position.column,
                value: spawnResult.value
            } : null
        };
    }

    function hasWinningTile(board, target) {
        var goal = target || 2048;
        return board.some(function (row) {
            return row.some(function (value) {
                return value >= goal;
            });
        });
    }

    function hasAvailableMoves(board) {
        for (var row = 0; row < board.length; row += 1) {
            for (var column = 0; column < board[row].length; column += 1) {
                var value = board[row][column];

                if (value === 0) {
                    return true;
                }

                if (column < board[row].length - 1 && value === board[row][column + 1]) {
                    return true;
                }

                if (row < board.length - 1 && value === board[row + 1][column]) {
                    return true;
                }
            }
        }

        return false;
    }

    return {
        applyPlayerMove: applyPlayerMove,
        calculateMove: calculateMove,
        cloneBoard: cloneBoard,
        createEmptyBoard: createEmptyBoard,
        getEmptyCells: getEmptyCells,
        hasAvailableMoves: hasAvailableMoves,
        hasWinningTile: hasWinningTile,
        spawnRandomTile: spawnRandomTile
    };
}));
