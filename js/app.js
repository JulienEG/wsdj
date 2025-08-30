const app = new Vue({
  el: "#app",
  data: {
    tableData: [
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      {
        pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
        pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
        wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
        noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
      },
      
    ],
    notes: [
      null,
      // Octave 0
      "C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0",

      // Octave 1
      "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",

      // Octave 2
      "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",

      // Octave 3
      "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",

      // Octave 4
      "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",

      // Octave 5
      "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",

      // Octave 6
      "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",

      // Octave 7
      "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",

      // Octave 8
      "C8"
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
      return this.tableData.map(row =>
        row.pulse1.noteIndex >= 0 ? this.notes[row.pulse1.noteIndex] : null
      );
    },
    pulse1Durations() {
      return this.tableData.map(row =>
        row.pulse1.durationIndex != null ? this.durations[row.pulse1.durationIndex] : "8n"
      );
    },
    pulse1Velocities() {
      return this.tableData.map(row =>
        row.pulse1.velocityIndex != null ? this.velocityMap[this.velocities[row.pulse1.velocityIndex]] : 0
      );
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
    
    this.pu1Synth = new Tone.Synth({
      oscillator: { type: "pulse", width: 0.125 }
    }).connect(this.masterVolume);
    
    this.pu2Synth = new Tone.Synth({
      oscillator: { type: "pulse", width: 0.125 }
    }).connect(this.masterVolume);
  },

  methods: {
  // -- Cell Methods -- //

    // Méthode générique pour mettre à jour une cellule
    updateCell(rowIndex, synthKey, indexKey, newIndex) {
      if (this.tableData[rowIndex][synthKey]) {
        this.$set(this.tableData[rowIndex][synthKey], indexKey, newIndex);
      }
    },

    onScrollCell(event, section, property, rowIndex, listName) {
      event.preventDefault();
    
      const step = event.ctrlKey ? 12 : 1;
      const delta = event.deltaY > 0 ? -step : step;
    
      const currentIndex = this.tableData[rowIndex][section][property];
      const list = this[listName];
    
      // Calcul du nouvel index avec wrap-around
      let newIndex = (currentIndex + delta) % list.length;
      if (newIndex < 0) newIndex += list.length; // éviter les indices négatifs
    
      this.tableData[rowIndex][section][property] = newIndex;
    },
    
    onClickCell(rowIndex, synthKey, indexKey) {
      if (this.tableData[rowIndex][synthKey]) {
        this.$set(this.tableData[rowIndex][synthKey], indexKey, 0);
      }
    },

    // Affichage du contenu d'une cellule
    displayValue(row, synthKey, indexKey) {
      const cell = row[synthKey];
      if (!cell || cell[indexKey] == null) return "";
    
      const index = cell[indexKey];
    
      if (indexKey === "noteIndex") return this.notes[index] ?? "";
      if (indexKey === "durationIndex") return this.durations[index] ?? "";
      if (indexKey === "velocityIndex") return this.velocities[index] ?? "";
      
      return "";
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
          {
            pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
            pulse2: { noteIndex: null, durationIndex: null, velocityIndex: null },
            wave3: { noteIndex: null, durationIndex: null, velocityIndex: null },
            noise4: { noteIndex: null, durationIndex: null, velocityIndex: null }
          }
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
      if (Tone.context.state !== "running") await Tone.start();
    
      // reset du transport
      Tone.Transport.cancel();
      Tone.Transport.stop();
    
      const seq1 = new Tone.Sequence(
        (time, stepIndex) => {
          const note = this.pulse1Notes[stepIndex];
          const duration = this.pulse1Durations[stepIndex] || "8n";
          const velocity = this.pulse1Velocities[stepIndex] || 0.8;
          if (note) this.pu1Synth.triggerAttackRelease(note, duration, time, velocity);
        },
        this.pulse1Notes.map((_, i) => i),"8n"
      );
    
      Tone.Transport.bpm.value = this.bpm;
      seq1.start(0);
      Tone.Transport.start();
    },

  stopSequence() {
    if (this.currentSequence) {
      this.currentSequence.stop();
      this.currentSequence.dispose();
      this.currentSequence = null;
    }
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
