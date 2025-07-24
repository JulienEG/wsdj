const app = new Vue({
  el: "#app",
  data: {
    notes: [
      " ",
      "A1", "A#1", "B1", "B#1", "C1", "C#1", "D1", "D#1", "E1", "E#1", "F1", "F#1", "G1", "G#1",
      "A2", "A#2", "B2", "B#2", "C2", "C#2", "D2", "D#2", "E2", "E#2", "F2", "F#2", "G2", "G#2",
      "A3", "A#3", "B3", "B#3", "C3", "C#3", "D3", "D#3", "E3", "E#3", "F3", "F#3", "G3", "G#3",
      "A4", "A#4", "B4", "B#4", "C4", "C#4", "D4", "D#4", "E4", "E#4", "F4", "F#4", "G4", "G#4",
      "A5", "A#5", "B5", "B#5", "C5", "C#5", "D5", "D#5", "E5", "E#5", "F5", "F#5", "G5", "G#5",
      "A6", "A#6", "B6", "B#6", "C6", "C#6", "D6", "D#6", "E6", "E#6", "F6", "F#6", "G6", "G#6",
      "A7", "A#7", "B7", "B#7", "C7", "C#7", "D7", "D#7", "E7", "E#7", "F7", "F#7", "G7", "G#7",
      "A8", "A#8", "B8", "B#8", "C8", "C#8", "D8", "D#8", "E8", "E#8", "F8", "F#8", "G8", "G#8",
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
    volumeDb: -10,
  },
  mounted() {
    this.masterVolume = new Tone.Volume(this.volumeDb).toDestination();
    
    // Synths initialisation
    this.pu1Synth = new Tone.Synth({
      oscillator: {
        type: "pulse",
        width: 0.125, // 0.125, 0.25, 0.50, 0.75
      },
    }).connect(this.masterVolume); // plugs the synth to the master volume
    this.pu2Synth = new Tone.Synth({
      oscillator: {
        type: "pulse",
        width: 0.125, // 0.125, 0.25, 0.50, 0.75
      },
    }).connect(this.masterVolume); // plugs the synth to the master volume
  },

  computed: {},
  watch: {
    bpm(newBpm) {
      Tone.Transport.bpm.value = newBpm;
    },
    volumeDb(newVal) {
        this.masterVolume.volume.value = newVal;
    },
  },

  methods: {
    onScrollCell(event, indexName, arrayName) {
      const dir = event.deltaY > 0 ? -1 : 1;
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

    onScrollVolume(event) {
      const delta = Math.sign(event.deltaY);
      let newVal = this.volumeDb - delta; // molette haut = +1
      if (newVal > 0) newVal = 0;
      if (newVal < -60) newVal = -60;
      this.volumeDb = newVal;
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

      // Tone.Transport.bpm.value = this.bpm;
      // Tone.Master.volume = this.volumeDb;
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






