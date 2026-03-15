(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.BoardRenderer2048 = factory();
    }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    function getCurrencyInfo(currencies, value) {
        return currencies[value] || {
            symbol: String(value),
            code: "",
            color: "#3dc28a",
            text: "#f9f6f2"
        };
    }

    function hashMoveId(moveId) {
        var text = String(moveId || "move-0");
        var hash = 0;
        var index;

        for (index = 0; index < text.length; index += 1) {
            hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
        }

        return hash;
    }

    function buildSpawnRouletteSequence(spawnValue, moveId) {
        var pool = [2, 4, 8, 16, 32, 64, 128, 256];
        var steps = 6;
        var seed = hashMoveId(moveId) % pool.length;
        var sequence = [];
        var offset;

        for (offset = 0; offset < steps; offset += 1) {
            sequence.push(pool[(seed + offset) % pool.length]);
        }

        sequence.push(spawnValue);

        return sequence;
    }

    function buildBoardShell(boardEl, size) {
        boardEl.innerHTML = "";

        for (var row = 0; row < size; row += 1) {
            for (var column = 0; column < size; column += 1) {
                var cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.row = String(row);
                cell.dataset.column = String(column);
                boardEl.appendChild(cell);
            }
        }
    }

    function createTileNode(value, currencies, extraClassName) {
        var tile = document.createElement("div");
        var info = getCurrencyInfo(currencies, value);

        tile.className = "tile " + extraClassName;
        tile.style.backgroundColor = info.color;
        tile.style.color = info.text;
        tile.innerHTML = "<div class=\"symbol\">" + info.symbol + "</div><div class=\"code\">" + info.code + "</div>";

        return tile;
    }

    function getCellMap(boardEl) {
        var cellMap = {};
        var boardRect = boardEl.getBoundingClientRect();

        boardEl.querySelectorAll(".cell").forEach(function (cell) {
            var rect = cell.getBoundingClientRect();
            var key = cell.dataset.row + ":" + cell.dataset.column;

            cellMap[key] = {
                left: rect.left - boardRect.left,
                top: rect.top - boardRect.top,
                width: rect.width,
                height: rect.height
            };
        });

        return cellMap;
    }

    function renderBoard(options) {
        var board = options.board;
        var boardEl = options.boardEl;
        var currencies = options.currencies;
        var newPosition = options.newPosition;
        var mergedPositions = options.mergedPositions || [];

        buildBoardShell(boardEl, board.length);

        board.forEach(function (row, rowIndex) {
            row.forEach(function (value, columnIndex) {
                var cell;
                var tile;
                var isNew;
                var isMerged;

                if (!value) {
                    return;
                }

                cell = boardEl.querySelector(".cell[data-row='" + rowIndex + "'][data-column='" + columnIndex + "']");
                tile = createTileNode(value, currencies, "static-tile");
                isNew = newPosition && newPosition.row === rowIndex && newPosition.column === columnIndex;
                isMerged = mergedPositions.some(function (position) {
                    return position.row === rowIndex && position.column === columnIndex;
                });

                if (isNew) {
                    tile.classList.add("new");
                }

                if (isMerged) {
                    tile.classList.add("merged");
                }

                cell.appendChild(tile);
            });
        });
    }

    function renderBoardWithHiddenTargets(options) {
        var hiddenTargets = options.hiddenTargets || {};

        renderBoard({
            boardEl: options.boardEl,
            board: options.board.map(function (row, rowIndex) {
                return row.map(function (value, columnIndex) {
                    var key = rowIndex + ":" + columnIndex;
                    return hiddenTargets[key] ? 0 : value;
                });
            }),
            currencies: options.currencies,
            newPosition: null,
            mergedPositions: []
        });
    }

    function renderSpawnRoulette(options) {
        var boardEl = options.boardEl;
        var currencies = options.currencies;
        var event = options.event;
        var onComplete = options.onComplete;
        var cell;
        var tile;
        var symbolEl;
        var codeEl;
        var sequence;
        var stepDelay;
        var stepIndex = 0;
        var intervalId;

        if (!event) {
            if (typeof onComplete === "function") {
                onComplete();
            }
            return;
        }

        cell = boardEl.querySelector(".cell[data-row='" + event.row + "'][data-column='" + event.column + "']");

        if (!cell) {
            if (typeof onComplete === "function") {
                onComplete();
            }
            return;
        }

        tile = createTileNode(event.value, currencies, "static-tile spawn-roulette");
        symbolEl = tile.querySelector(".symbol");
        codeEl = tile.querySelector(".code");
        symbolEl.textContent = "";
        codeEl.textContent = "";
        cell.appendChild(tile);

        if (event.reducedMotion || event.durationMs <= 0) {
            tile.classList.remove("spawn-roulette");
            tile.classList.add("roulette-resolved");
            window.setTimeout(function () {
                if (typeof onComplete === "function") {
                    onComplete();
                }
            }, 16);
            return;
        }

        sequence = buildSpawnRouletteSequence(event.value, event.moveId);
        stepDelay = Math.max(30, Math.floor(event.durationMs / sequence.length));

        intervalId = window.setInterval(function () {
            var info;

            if (stepIndex >= sequence.length) {
                window.clearInterval(intervalId);
                tile.classList.remove("spawn-roulette");
                tile.classList.add("roulette-resolved");

                window.setTimeout(function () {
                    if (typeof onComplete === "function") {
                        onComplete();
                    }
                }, 40);

                return;
            }

            info = getCurrencyInfo(currencies, sequence[stepIndex]);
            symbolEl.textContent = info.symbol;
            codeEl.textContent = info.code;
            stepIndex += 1;
        }, stepDelay);
    }

    function renderAnimatedMove(options) {
        var boardEl = options.boardEl;
        var finalBoard = options.finalBoard;
        var currencies = options.currencies;
        var transitions = options.transitions || [];
        var mergedPositions = options.mergedPositions || [];
        var newPosition = options.newPosition;
        var durationMs = options.durationMs || 300;
        var spawnRoulette = options.spawnRoulette || null;
        var onMoveComplete = options.onMoveComplete;
        var onComplete = options.onComplete;
        var cellMap;
        var hiddenTargets = {};

        transitions.forEach(function (transition) {
            hiddenTargets[transition.toRow + ":" + transition.toColumn] = true;
        });

        mergedPositions.forEach(function (position) {
            hiddenTargets[position.row + ":" + position.column] = true;
        });

        if (newPosition) {
            hiddenTargets[newPosition.row + ":" + newPosition.column] = true;
        }

        renderBoardWithHiddenTargets({
            boardEl: boardEl,
            board: finalBoard,
            currencies: currencies,
            hiddenTargets: hiddenTargets
        });
        cellMap = getCellMap(boardEl);

        transitions.forEach(function (transition) {
            var fromKey = transition.fromRow + ":" + transition.fromColumn;
            var toKey = transition.toRow + ":" + transition.toColumn;
            var fromCell = cellMap[fromKey];
            var toCell = cellMap[toKey];
            var tile;
            var deltaX;
            var deltaY;

            if (!fromCell || !toCell) {
                return;
            }

            tile = createTileNode(transition.value, currencies, "moving-tile");
            tile.style.left = fromCell.left + "px";
            tile.style.top = fromCell.top + "px";
            tile.style.width = fromCell.width + "px";
            tile.style.height = fromCell.height + "px";
            tile.style.setProperty("--move-duration", durationMs + "ms");

            if (transition.type === "merge") {
                tile.classList.add("merge-source");
            }

            boardEl.appendChild(tile);

            deltaX = toCell.left - fromCell.left;
            deltaY = toCell.top - fromCell.top;

            // Force the browser to commit the initial position before starting the
            // transition. A single rAF is not enough because the browser can batch
            // both changes into the same frame and skip the animation entirely.
            // Reading a layout property (getBoundingClientRect) triggers a synchronous
            // style/layout recalculation that "anchors" the starting state.
            tile.getBoundingClientRect();
            tile.style.transform = "translate(" + deltaX + "px, " + deltaY + "px)";
        });

        window.setTimeout(function () {
            if (typeof onMoveComplete === "function") {
                onMoveComplete();
            }

            if (spawnRoulette) {
                renderBoard({
                    boardEl: boardEl,
                    board: finalBoard,
                    currencies: currencies,
                    newPosition: null,
                    mergedPositions: mergedPositions
                });

                renderSpawnRoulette({
                    boardEl: boardEl,
                    currencies: currencies,
                    event: spawnRoulette,
                    onComplete: function () {
                        renderBoard({
                            boardEl: boardEl,
                            board: finalBoard,
                            currencies: currencies,
                            newPosition: null,
                            mergedPositions: []
                        });

                        if (typeof onComplete === "function") {
                            onComplete();
                        }
                    }
                });
                return;
            }

            renderBoard({
                boardEl: boardEl,
                board: finalBoard,
                currencies: currencies,
                newPosition: newPosition,
                mergedPositions: mergedPositions
            });

            if (typeof onComplete === "function") {
                onComplete();
            }
        }, durationMs + 30);
    }

    return {
        buildSpawnRouletteSequence: buildSpawnRouletteSequence,
        renderAnimatedMove: renderAnimatedMove,
        renderBoard: renderBoard
    };
}));
