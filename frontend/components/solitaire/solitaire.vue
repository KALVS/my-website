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
        <div class="tableau-pile">
          <div class="card-container">
            <PlayingCard
              :show-front="true"
              suit="Hearts"
              value="A"
              suit-color="red"
              suit-symbol="♥"
              show
            />
          </div>
        </div>
        <div class="tableau-pile">
          <div class="card-container">
            <PlayingCard
              :show-front="true"
              suit="Hearts"
              value="A"
              suit-color="red"
              suit-symbol="♥"
            />
          </div>
        </div>
        <div class="tableau-pile">
          <div class="card-container">
            <PlayingCard
              :show-front="true"
              suit="Hearts"
              value="A"
              suit-color="red"
              suit-symbol="♥"
            />
          </div>
        </div>
        <div class="tableau-pile">
          <div class="card-container">
            <PlayingCard
              :show-front="true"
              suit="Hearts"
              value="A"
              suit-color="red"
              suit-symbol="♥"
            />
          </div>
        </div>
        <div class="tableau-pile">
          <div class="card-container">
            <PlayingCard
              :show-front="true"
              suit="Hearts"
              value="A"
              suit-color="red"
              suit-symbol="♥"
            />
          </div>
        </div>
        <div class="tableau-pile">
          <div class="card-container">
            <PlayingCard
              :show-front="true"
              suit="Hearts"
              value="A"
              suit-color="red"
              suit-symbol="♥"
            />
          </div>
        </div>
        <div class="tableau-pile">
          <div class="card-container">
            <PlayingCard
              :show-front="true"
              suit="Hearts"
              value="A"
              suit-color="red"
              suit-symbol="♥"
            />
          </div>
        </div>
      </div>
      <!-- </div> -->
      <!-- <div class="card-container">
        <PlayingCard suit="Hearts" value="A" suit-color="red" suit-symbol="♥" />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import PlayingCard from './playingCard.vue'
export default {
  name: 'SolitaireComponent',
  components: {
    PlayingCard
  }
}
</script>

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

.card.stock-card {
  width: 100%;
  height: 100%;
  background-color: #ddd;
  border-radius: 10px;
  position: absolute;
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
  flex-wrap: wrap;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  gap: 20px;
  /* width: 700px; */
}

.tableau-pile {
  width: 100px;
  height: 150px;
  border: 1px solid #000;
}

.card-container {
  display: flex;
}
</style>
