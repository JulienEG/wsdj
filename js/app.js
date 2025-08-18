const app = new Vue({
  el: "#app",
  data: {
    tableData: [
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
      [
        { noteIndex: 0 },
        { durationIndex: 0 },
        { velocityIndex: 0 }
      ],
    ],
    notes: [
      null,
      "A1", "A#1", "B1", "B#1", "C1", "C#1", "D1", "D#1", "E1", "E#1", "F1", "F#1", "G1", "G#1", 
      "A2", "A#2", "B2", "B#2", "C2", "C#2", "D2", "D#2", "E2", "E#2", "F2","F#2","G2","G#2",
      "A3", "A#3", "B3", "B#3", "C3", "C#3", "D3", "D#3", "E3", "E#3", "F3","F#3","G3","G#3",
      "A4", "A#4", "B4", "B#4", "C4", "C#4", "D4", "D#4", "E4", "E#4", "F4","F#4","G4","G#4",
      "A5", "A#5", "B5", "B#5", "C5", "C#5", "D5", "D#5", "E5", "E#5","F5","F#5","G5","G#5",
      "A6", "A#6", "B6", "B#6", "C6", "C#6", "D6", "D#6", "E6", "E#6","F6","F#6","G6","G#6",
      "A7", "A#7", "B7", "B#7", "C7", "C#7", "D7", "D#7", "E7", "E#7","F7","F#7","G7","G#7",
      "A8", "A#8", "B8", "B#8", "C8", "C#8", "D8", "D#8", "E8", "E#8","F8","F#8","G8","G#8",
    ],
    durations: [null, "1n", "2n", "4n", "8n", "16n"],
    velocities: [null, "pp", "p", "mp", "mf", "f", "ff"],
    velocityMap: {
      pp: 0.2, p: 0.35, mp: 0.5, mf: 0.65, f: 0.8, ff: 1.0
    },
    currentPlayingRow: null,
    pu1Synth: null,
    pu2Synth: null,
    bpm: 128,
    volumeDb: -10,
    pulse2Notes: [],
    waveNotes: [],
    noiseNotes: [],
  },

  computed: {
    pulse1Notes() {
      return this.tableData.map(row => {
        const noteIndex = row[0].noteIndex;
        return noteIndex >= 0 ? this.notes[noteIndex] : null;
      });
    },
  },

  watch: {
    bpm(newBpm) {
      Tone.Transport.bpm.value = newBpm;
    },
    volumeDb(newVal) {
      if (this.masterVolume) {
        this.masterVolume.volume.value = newVal;
      }
    },
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

  methods: {
  // -- Cell Methods -- //

    // Méthode générique pour mettre à jour une cellule
    updateCell(rowIndex, colIndex, indexKey, newIndex) {
      this.$set(this.tableData[rowIndex][colIndex], indexKey, newIndex);
    },

    // Gestion du scroll (incrément/décrément circulaire)
    onScrollCell(event, rowIndex, colIndex, indexKey, listName) {
      const dir = event.deltaY > 0 ? -1 : 1;
      const list = this[listName];
      let currentIndex = this.tableData[rowIndex][colIndex][indexKey];

      const newIndex = (currentIndex + dir + list.length) % list.length;

      this.updateCell(rowIndex, colIndex, indexKey, newIndex);
    },

    // Gestion du clic (reset à 0)
    onClickCell(rowIndex, colIndex, indexKey) {
      this.$set(this.tableData[rowIndex][colIndex], indexKey, 0);
    },

    // Affichage du contenu d'une cellule
    displayValue(cell, colIndex) {
      const key = Object.keys(cell)[0];
      const index = cell[key];

      if (colIndex === 0) return this.notes[index];
      if (colIndex === 1) return this.durations[index];
      if (colIndex === 2) return this.velocities[index];
      return null;
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

  onAddSequence() {
    for (let i = 0; i < 16; i++) {
      const row = [
        { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
      ];
      this.sequences.push(row);
    }
  },

  onRemoveSequence() {
    // remove 16 dernières lignes (ou adapte à ton besoin)
    this.sequences.splice(Math.max(0, this.sequences.length - 16), 16);
  },

  updatePulse1Notes() {
    this.pulse1Notes = this.tableData.map(row => {
      const noteIndex = row[0].noteIndex;
      return noteIndex >= 0 ? this.notes[noteIndex] : null;
    });
  },

  async playSequence() {
    if (Tone.context.state !== "running") {
      await Tone.start(); // <- () !
    }
    const sequence = new Tone.Sequence(
      (time, note) => {
        if (note) this.pu1Synth.triggerAttackRelease(note, "8n", time);
      },
      this.pulse1Notes,
      "8n"
    );

    Tone.Transport.bpm.value = this.bpm;
    sequence.start(0);
    Tone.Transport.start();
  },

  stopSequence() {
    Tone.Transport.stop();
  },

  playRow(rowIndex) {
    this.currentPlayingRow = rowIndex;
    // Lancer la note avec Tone.js ici
    // ...
  },

  // -- Synths Methods -- //

    setPulseWidth(synth, width) {
      if (synth?.oscillator?.width) {
        synth.oscillator.width.value = width;
      }
    },
  },
});
