const app = new Vue({
  el: "#app",
  data: {
    tableData: [],
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
    sequences: null,
    currentPlayingRow: null,
    bpm: 128,
    volumeDb: -10,
  },

  computed: {   
  // Redirection des index de tableData vers les synthés initialisés 
  // === Pulse1 ===
  pulse1Notes() {
    return this.tableData.map(r => r.pulse1.noteIndex !== null ? this.notes[r.pulse1.noteIndex] : null);
  },
  pulse1Durations() {
    return this.tableData.map(r => {
      const dur = this.durations[r.pulse1.durationIndex];
      return dur || "8n"; // si null ou undefined, prend "8n"
    });
  },
  
  pulse1Velocities() {
    return this.tableData.map(r => {
      const key = this.velocities[r.pulse1.velocityIndex];
      return this.velocityMap[key] || 0.8; // valeur par défaut
    });
  },

  // === Pulse2 ===
  pulse2Notes() {
    return this.tableData.map(r => r.pulse2.noteIndex !== undefined ? this.notes[r.pulse2.noteIndex] : "8n");
  },
  pulse2Durations() {
    return this.tableData.map(r => {
      const dur = this.durations[r.pulse2.durationIndex];
      return dur || "8n"; // si null ou undefined, prend "8n"
    });
  },
  pulse2Velocities() {
    return this.tableData.map(r => {
      const key = this.velocities[r.pulse2.velocityIndex];
      return this.velocityMap[key] || 0.8; // valeur par défaut
    });
  },

  // === Wave3 ===
  wave3Notes() {
    return this.tableData.map(r => r.wave3.noteIndex !== undefined ? this.notes[r.wave3.noteIndex] : null
    );
  },
  wave3Durations() {
    return this.tableData.map(r => {
      const dur = this.durations[r.wave3.durationIndex];
      return dur || "8n"; // si null ou undefined, prend "8n"
    });
  },
  wave3Velocities() {
    return this.tableData.map(r => {
      const key = this.velocities[r.wave3.velocityIndex];
      return this.velocityMap[key] !== undefined ? this.velocityMap[key] : 0.8;
    });
  },

  // === Noise4 === (pas de notes !)
  // noise4Durations() {
  //   return this.tableData.map(r => r.noise4.durationIndex !== null ? this.durations[r.noise4.durationIndex] : "8n");
  // },
  // noise4Velocities() {
  //   return this.tableData.map(r => {
  //     const idx = r.noise4.velocityIndex;
  //     const key = this.velocities[idx];
  //     return key ? this.velocityMap[key] : 0.8;
  //   });
  // }
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
    this.onAddSequence();

    // === Pulse 1 Synth ===
  this.pu1Synth = new Tone.Synth({
    oscillator: { type: "square", width: 0.25 },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.4,
      release: 0.2,
    },
  }).toDestination();

  // === Pulse 2 Synth ===
  this.pu2Synth = new Tone.Synth({
    oscillator: { type: "square", width: 0.25 },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.3,
      release: 0.2,
    },
  }).toDestination();

  // === Wave 3 Synth ===
    this.wave3Synth = new Tone.Synth({
    oscillator: {
      type: "custom",
      partials: [1,0.5,0.25,0.125], // son plus “crénelé”
      phase: 0
    },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.2 }
  }).toDestination();

  // === Noise 4 Synth ===
  // this.noise4Synth = new Tone.NoiseSynth({
  //   noise: { type: "white" }, // bruit blanc
  //   envelope: {
  //     attack: 0.005,
  //     decay: 0.15,
  //     sustain: 0,
  //     release: 0.05,
  //   },
  // }).toDestination();

  // Transport réglé mais non lancé
  Tone.Transport.bpm.value = this.bpm;
  },

  methods: { 
    //---------- Cell manipulation section ----------//
    // Affichage du contenu d'une cellule
    displayValue(row, synthKey, indexKey) {
      const idx = row[synthKey][indexKey];
      if (indexKey === "noteIndex") return idx !== null ? this.notes[idx] : "";
      if (indexKey === "durationIndex") return idx !== null ? this.durations[idx] : "";
      if (indexKey === "velocityIndex") return idx !== null ? this.velocities[idx] : "";
      return "";
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

    // Méthode générique pour mettre à jour une cellule
    updateCell(rowIndex, synthKey, indexKey, newIndex) {
      this.$set(this.tableData[rowIndex][synthKey], indexKey, newIndex); 
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

    //---------- Sequence gestion section ----------//

    onAddSequence() {
      for (let i = 0; i < 16; i++) {
        const row = {
            pulse1: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
            pulse2: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
            wave3: { noteIndex: 0, durationIndex: 0, velocityIndex: 0 },
            noise4: { durationIndex: null, velocityIndex: null }
          };
        this.tableData.push(row);
      }
    },

    onRemoveSequence() {
      // remove 16 dernières lignes (ou adapte à ton besoin)
      this.tableData.splice(Math.max(0, this.sequences.length - 16), 16);
    },

    //---------- Playback section ----------// 

    async playSequence() {
      // Résumé du contexte au premier click
      if (Tone.context.state !== "running") await Tone.start();

      // Reset transport
      Tone.Transport.cancel();
      Tone.Transport.stop();

      // Pulse1
      const seq1 = new Tone.Sequence(
        (time, i) => {
          const note = this.pulse1Notes[i];
          const dur = this.pulse1Durations[i];
          const vel = this.pulse1Velocities[i];
          if (note) this.pu1Synth.triggerAttackRelease(note, dur, time, vel);
        },
        this.pulse1Notes.map((_, i) => i),
        "8n"
      );

      // Pulse2
      const seq2 = new Tone.Sequence(
        (time, i) => {
          const note = this.pulse2Notes[i];
          const dur = this.pulse2Durations[i];
          const vel = this.pulse2Velocities[i];
          if (note) this.pu2Synth.triggerAttackRelease(note, dur, time, vel);
        },
        this.pulse2Notes.map((_, i) => i),
        "8n"
      );

      // Wave3
      const seq3 = new Tone.Sequence(
        (time, i) => {
          const note = this.wave3Notes[i];
          const dur = this.wave3Durations[i];
          const vel = this.wave3Velocities[i];
          if (note) this.wave3Synth.triggerAttackRelease(note, dur, time, vel);
        },
        this.wave3Notes.map((_, i) => i),
        "8n"
      );

      // Noise4 (pas de note)
      // const seq4 = new Tone.Sequence(
      //   (time, i) => {
      //     const dur = this.noise4Durations[i];
      //     const vel = this.noise4Velocities[i];
      //     this.noise4Synth.triggerAttackRelease(dur, time, vel);
      //   },
      //   this.noise4Durations.map((_, i) => i),
      //   "8n"
      // );

      // stocker toutes les séquences
      this.sequences = [seq1, seq2, seq3, /*seq4*/];

      Tone.Transport.bpm.value = this.bpm;

      seq1.start(0);
      seq2.start(0);
      seq3.start(0);
      // seq4.start(0);

      Tone.Transport.start();
    },


    stopSequence() {
      if (this.sequences) {
        this.sequences.forEach(seq => seq.stop());
        this.sequences.forEach(seq => seq.dispose());
        this.sequences = null;
      }
      Tone.Transport.stop();
    },
},
});
