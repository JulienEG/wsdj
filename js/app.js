const app = new Vue({
  el: "#app",
  data: {
    notes: [" ", "A", "A#", "B", "B#", "C", "C#", "D", "D#" ,"E" ,"E#" ,"F" ,"F#" ,"G", "G#"],
    currentNoteIndex: 0,
    pitches: [" ", "1", "2", "3", "4", "5", "6", "7", "8"],
    currentPitchIndex: 0,
    effects: [" ", "a", "b", "c", "d", "e"],
    currentEffectIndex: 0,
    pulse1Notes: [],
    pulse2Notes: [],
    waveNotes: [],
    noiseNotes: [],
    pu1Synth: null,
    pu2Synth: null,
  },
  mounted() {
    // Synths initialisation
    this.pu1Synth = new Tone.Synth({
      oscillator: {
        type: "pulse",
        width: 0.125 // 0.125, 0.25, 0.50, 0.75
      }
    }).toDestination();


  },
  computed: {},

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

    async playNote() {
      if (Tone.context !== "running") {
        await Tone.start;
      }
      this.pu1Synth.triggerAttackRelease("C4", "16n");
    },

    //// Synths Methods ////
    
    setPulseWidth(synth, width) {
      synth.oscillator.width = width;
    },
  }
});






