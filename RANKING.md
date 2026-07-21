# Sistema de Ranking - Where?

O ranking é calculado com base nas **partidas dos últimos 30 dias**.

## Critérios

Cada partida vale até **5.000 pontos**. Para subir de ranking, o jogador precisa atingir os requisitos de **número mínimo de partidas** E **pontuação total acumulada** na janela de 30 dias.

| Ranking | Partidas (mín.) | Pontos Acumulados (mín.) |
|---------|----------------:|-------------------------:|
| 🏆 **PLATINA** | 20 | 70.000 |
| 💎 **DIAMANTE** | 18 | 60.000 |
| 🥇 **OURO** | 16 | 50.000 |
| 🥈 **PRATA** | 12 | 30.000 |
| 🥉 **BRONZE** | 8 | 15.000 |
| ⛓️ **FERRO** | 3 | 10.000 |
| 📖 **ANALFABETO GEOGRÁFICO** | < 3 | < 10.000 |

## Funcionamento

- A cada partida finalizada, o resultado (pontuação total) é salvo no banco
- O ranking é recalculado automaticamente consultando as partidas dos últimos 30 dias
- O ranking máximo atingido pelo jogador dentro do período define seu badge
- O badge é exibido ao lado do nome do usuário no menu do navbar
