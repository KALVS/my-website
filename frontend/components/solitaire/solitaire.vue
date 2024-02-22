<script lang="ts">
import Vue from 'vue'
import { Container, Draggable } from 'vue-smooth-dnd'
import { deck } from './deck'
import PlayingCard, { PlayingCardProps } from './playingCard.vue'

export default Vue.extend({
  name: 'SolitaireComponent',
  components: {
    PlayingCard,
    Container,
    Draggable
  },
  data() {
    return { tableauPiles: [] as Array<Array<PlayingCardProps>> }
  },
  mounted() {
    // import { ref } from 'vue'
    // import draggable from 'vuedraggable'

    function fisherYatesShuffle(deck: any[]) {
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[deck[i], deck[j]] = [deck[j], deck[i]] // Swap elements
      }
      return deck
    }
    function prepareTableau(deck: any[]): any[][] {
      const tableau: Array<Array<PlayingCardProps>> = []
      let currentIndex = 0

      // Number of tableau piles and initial cards per pile
      const numberOfPiles = 7

      for (let i = 0; i < numberOfPiles; i++) {
        tableau.push([])
        for (let j = 0; j <= i; j++) {
          if (currentIndex < deck.length) {
            tableau[i].push(deck[currentIndex])
            currentIndex++
          }
          if (j === i) {
            tableau[i][j].parentShowFront = true
          }
        }
      }

      return tableau
    }

    const shuffledDeck = fisherYatesShuffle(deck)
    this.tableauPiles = prepareTableau(shuffledDeck)
  },
  methods: {
    testClick(card, cardIndex, pileLength) {
      console.log('testClick')
      const isLastCard = cardIndex + 1 === pileLength
      if (isLastCard) {
        card.parentShowFront = true
        console.log('testClick', card.parentShowFront)
      }
    }
  }
})
</script>

<template>
  <div class="window glass transparent" style="">
    <div class="title-bar">
      <div class="title-bar-text">
        {{ 'Solitaire' }}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Minimize" />
        <button aria-label="Close" @click="$emit('selectedradio', false)" />
      </div>
    </div>
    <div class="window-body">
      <div class="solitaire-game">
        <div class="stock-pile">
          <!-- Stock pile area for drawing cards -->
          <div class="card stock-card" />
        </div>
        <div class="foundation-piles">
          <!-- Foundation piles for building suits -->
          <div class="foundation-pile hearts-pile" />
          <div class="foundation-pile diamonds-pile" />
          <div class="foundation-pile clubs-pile" />
          <div class="foundation-pile spades-pile" />
        </div>
      </div>
      <div class="tableau">
        <!-- Tableau piles for arranging cards -->

        <div
          v-for="(pile, index) in tableauPiles"
          :key="index"
          class="tableau-pile"
        >
          <!-- <Container></Container> -->
          <div>
            <Container
              v-for="(card, cardIndex) in pile"
              :key="card"
              class="card-container"
            >
              <Draggable>
                <PlayingCard
                  :parent-show-front="card.parentShowFront"
                  :suit="card.suit"
                  :value="card.value"
                  :suit-color="card.suitColor"
                  :suit-symbol="card.suitSymbol"
                  show
                  @click="testClick(card, cardIndex, pile.length)"
                />
              </Draggable>
            </Container>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transparent::before,
.transparent > .title-bar {
  background-color: transparent;
}

.window {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 80vw;
  /* max-height: 60ch; */
}

.solitaire-game {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
}

.stock-pile {
  width: 100px;
  height: 150px;
  border: 1px solid #000;
  position: relative;
}

.playing-card.stock-card {
  width: 100%;
  height: 100%;
  background-color: #ddd;
  border-radius: 10px;
  position: absolute;
}

.playing-card:first-child {
  margin-top: 0; /* No overlap for the first card */
}

.foundation-piles {
  display: flex;
  flex-direction: row;

  height: 300px;
}

.foundation-pile {
  width: 100px;
  height: 150px;
  border: 1px solid #000;
  /* margin-top: 20px; */
  margin: 20px;
}

.hearts-pile {
  background-color: #ff0000; /* Red */
}

.diamonds-pile {
  background-color: #ff5733; /* Orange */
}

.clubs-pile {
  background-color: #007bff; /* Blue */
}

.spades-pile {
  background-color: #000; /* Black */
}

.tableau {
  display: flex;
  justify-content: space-between;

  flex-direction: row;
  /* flex-grow: 1; */
  /* max-width: 150px; */
}

.tableau-pile {
  display: flex;
  /* flex-direction: row; */
  width: 100px;
  height: 150px;
  border: 1px solid #000;
}

.card-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* flex-direction: row; */
}
</style>
