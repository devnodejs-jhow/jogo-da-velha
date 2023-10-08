const board = document.getElementById("board");
        const cells = [];
        const status = document.getElementById("status");
        const resetButton = document.getElementById("reset");
        let currentPlayer = "X";
        let gameEnded = false;

        function checkWin() {
            const winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (const combo of winningCombos) {
                const [a, b, c] = combo;
                if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                    gameEnded = true;
                    status.textContent = `${currentPlayer} venceu!`;
                    return;
                }
            }

            if (!cells.some(cell => cell.textContent === "")) {
                gameEnded = true;
                status.textContent = "Empate!";
            }
        }

        function handleClick(event) {
            const cell = event.target;

            if (!cell.textContent && !gameEnded) {
                cell.textContent = currentPlayer;
                checkWin();
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }

        function resetGame() {
            cells.forEach(cell => {
                cell.textContent = "";
            });
            status.textContent = "";
            currentPlayer = "X";
            gameEnded = false;
        }

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cells.push(cell);
            cell.addEventListener("click", handleClick);
            board.appendChild(cell);
        }

        resetButton.addEventListener("click", resetGame);