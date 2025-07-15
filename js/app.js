const app = new Vue({
  el: "#app",
  data: {
    notes: [
      " ",
      "A",
      "A#",
      "B",
      "B#",
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "E#",
      "F",
      "F#",
      "G",
      "G#",
    ],
    currentNoteIndex: 0,
    pitches: [" ", "1", "2", "3", "4", "5", "6", "7", "8"],
    currentPitchIndex: 0,
    effects: [" ", "a", "b", "c", "d", "e"],
    currentEffectIndex: 0,
    pulse1Notes: ["C4", "E4", "G4", "B4", null, "C5", null, "G4"],
    pulse2Notes: [],
    waveNotes: [],
    noiseNotes: [],
    pu1Synth: null,
    pu2Synth: null,
    bpm: 128,
  },
  mounted() {
    // Synths initialisation
    this.pu1Synth = new Tone.Synth({
      oscillator: {
        type: "pulse",
        width: 0.125, // 0.125, 0.25, 0.50, 0.75
      },
    }).toDestination();
  },

  computed: {},
  watch: {
    bpm(newBpm) {
      Tone.Transport.bpm.value = newBpm;
    },
  },

  methods: {
    onScrollCell(event, indexName, arrayName) {
      const dir = event.deltaY > 0 ? 1 : -1;
      const total = this[arrayName].length;

      // récupère l'index actuel
      const currentIndex = this[indexName];

      // calcule le nouvel index
      const nextIndex = (currentIndex + dir + total) % total;

      // met à jour dynamiquement l'index ciblé
      this[indexName] = nextIndex;
    },

    onClickCell(indexName) {
      this[indexName] = 0;
    },

    onScrollBpm(event) {
      let step = 1;
      if (event.shiftKey) step = 10;
      if (event.ctrlKey) step = 5;

      const delta = Math.sign(event.deltaY);
      if (delta < 0 && this.bpm < 255) {
        this.bpm = Math.min(255, this.bpm + step);
      } else if (delta > 0 && this.bpm > 1) {
        this.bpm = Math.max(1, this.bpm - step);
      }
    },

    async playSequence() {
      if (Tone.context.state !== "running") {
        await Tone.start;
      }
      const sequence = new Tone.Sequence(
        (time, note) => {
          this.pu1Synth.triggerAttackRelease(note, "8n", time);
        },
        this.pulse1Notes,
        "8n"
      );

      Tone.Transport.bpm.value = this.bpm;
      sequence.start(0); // Lance la séquence
      Tone.Transport.start(); // Démarre le transport (la "clock" globale)
      // Tone.Transport.stop();
    },

    stopSequence() {
      Tone.Transport.stop();
    },

    //// Synths Methods ////

    setPulseWidth(synth, width) {
      synth.oscillator.width = width;
    },
  },
});






