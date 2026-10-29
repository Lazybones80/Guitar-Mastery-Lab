(function () {
  'use strict';

  const phaseData = [
    { key: '1', number: 1, title: 'Guitar foundations', range: 'Months 1–2', summary: 'Build a relaxed physical setup, a steady pulse, clean fretting, and the first useful sounds.', accent: 'teal' },
    { key: '2', number: 2, title: 'Fretboard literacy', range: 'Months 2–4', summary: 'Turn the neck into a readable map of notes, intervals, movable shapes, and rhythm.', accent: 'amber' },
    { key: '3', number: 3, title: 'Scales and fretboard patterns', range: 'Months 4–6', summary: 'Connect major, pentatonic, blues, CAGED, and three-notes-per-string ideas.', accent: 'teal' },
    { key: '4', number: 4, title: 'Triads and chord harmony', range: 'Months 6–9', summary: 'See harmony in small shapes, inversions, Roman numerals, and voice leading.', accent: 'amber' },
    { key: '5', number: 5, title: 'Rhythm and accompaniment', range: 'Months 8–11', summary: 'Keep the pulse while changing voicings, accents, textures, and complete song parts.', accent: 'teal' },
    { key: '6', number: 6, title: 'Technique and dexterity', range: 'Months 10–14', summary: 'Build efficient picking, legato, bends, muting, shifts, speed, and endurance.', accent: 'amber' },
    { key: '7', number: 7, title: 'Lead guitar and improvisation', range: 'Months 12–17', summary: 'Make musical phrases that target harmony, develop motifs, and move across the neck.', accent: 'teal' },
    { key: '8', number: 8, title: 'Ear training and transcription', range: 'Months 1–18', summary: 'Hear, sing, remember, locate, and transcribe musical information with increasing detail.', accent: 'amber' },
    { key: '9', number: 9, title: 'Advanced harmony and voicings', range: 'Months 16–21', summary: 'Add sevenths, extensions, guide tones, substitutions, modal color, and reharmonization.', accent: 'teal' },
    { key: '10', number: 10, title: 'Composition and musicianship', range: 'Months 18–24', summary: 'Turn technique and theory into finished arrangements, recordings, and an individual voice.', accent: 'amber' },
    { key: 'advanced', number: 11, title: 'Continuing advanced studies', range: 'After the roadmap', summary: 'Keep growing through genre vocabulary, advanced rhythm, fingerstyle, hybrid picking, and composition.', accent: 'teal' }
  ];

  const departments = [
    {
      id: 'fretboard', name: 'Fretboard & note memory', short: 'Fretboard', icon: '⌖', summary: 'Make every string and fret a dependable musical location.',
      modules: [
        { id: 'fb-foundations', name: 'String and fret landmarks', phase: '1', summary: 'String names, open notes, frets, and clean location habits.' },
        { id: 'fb-natural', name: 'Natural note routes', phase: '2', summary: 'Find natural notes across the neck without relying on one shape.' },
        { id: 'fb-accidentals', name: 'Chromatic spelling', phase: '2', summary: 'Use sharps, flats, enharmonics, and the twelve-note cycle correctly.' },
        { id: 'fb-horizontals', name: 'Octaves and horizontal maps', phase: '3', summary: 'Connect identical pitches and move through positions with purpose.' }
      ],
      titles: [
        'String 6 natural-note ladder', 'String 5 natural-note ladder', 'Two-string A-to-G relay', 'The twelve-fret chromatic clock',
        'Octave finder: low-E roots', 'Octave finder: A-string roots', 'Name before touch', 'Five-fret note hunt',
        'Accidental pairing: F♯ and G♭', 'One-minute low-E sweep', 'One-minute A-string sweep', 'Position-one note grid',
        'Position-five note grid', 'Same note, three places', 'Root route in C', 'Root route in G',
        'Frets zero through twelve flash map', 'Bass-note follow', 'Note-to-interval callout', 'Reverse fretboard spelling',
        'Key-of-D transposition walk', 'Full-neck landmark test'
      ],
      focus: [
        'Name the natural notes on string 6 from open E through fret 12, then play them with a metronome at 60 BPM.',
        'Name the natural notes on string 5 from open A through fret 12; speak each letter before the pick touches the string.',
        'Alternate between the A and D strings, locating every natural A through G pair before the next click.',
        'Start on open E and say the pitch class at every fret through fret 12, including the repeated E at the octave.',
        'Locate E, G, and B roots on the low E string and immediately play their octave on the D string.',
        'Locate A, C, and E roots on the A string and answer with the matching octave on the G string.',
        'Choose ten cards from the note deck; say the string and fret aloud before playing each answer.',
        'Stay between frets 1 and 5 and find every C, F, and G without looking at the picking hand.',
        'Spell F♯ as the third of D and G♭ as the fourth of D; play both locations and explain the different function.',
        'Run string 6 from open E to fret 12 and back, naming every pitch class without pausing.',
        'Run string 5 from open A to fret 12 and back, stopping only on C, F, and G.',
        'Map C, D, E, F, G, A, and B inside frets 1–4, then play the grid in ascending and descending order.',
        'Map the same seven natural notes inside frets 5–8 and connect the two C locations with an octave.',
        'Find the note C at frets 3, 5, and 8 on different strings, then play all three with identical tone.',
        'Play every C root from fret 3 to fret 15, moving one string at a time and naming the octave relationship.',
        'Play every G root from fret 3 to fret 15, then state whether the next copy is higher or lower.',
        'Use a twelve-card stack for frets 0–12; answer each card on two different strings within three seconds.',
        'Follow a four-bar bass line of C–A–F–G by locating each root in two positions before the next bar.',
        'Given a root on string 5, call out its perfect fifth on string 4 and its octave on string 3.',
        'Hear a note, play it, then name two alternate spellings or locations that could represent the same pitch class.',
        'Walk the D-major notes on strings 6 and 5, using F♯ and C♯ intentionally rather than their flat spellings.',
        'Draw a route from open strings to fret 12 that visits E, A, D, G, B, and E landmarks with no duplicate path.'
      ]
    },
    {
      id: 'intervals', name: 'Intervals & intervallic patterns', short: 'Intervals', icon: '↗', summary: 'Hear and play the distances that make scales, chords, and melodies intelligible.',
      modules: [
        { id: 'int-hear', name: 'Interval hearing', phase: '2', summary: 'Sing and identify the distances that anchor a key.' },
        { id: 'int-shapes', name: 'Physical interval shapes', phase: '3', summary: 'Build interval shapes across strings and positions.' },
        { id: 'int-patterns', name: 'Intervallic sequences', phase: '4', summary: 'Turn intervals into triads, skips, and melodic sequences.' },
        { id: 'int-context', name: 'Intervals in harmony', phase: '7', summary: 'Use characteristic intervals to create tension and release.' }
      ],
      titles: [
        'Unison and octave echo', 'Major-second ladder', 'Minor-third shape pair', 'Major-third singing check',
        'Perfect-fourth string skip', 'Tritone tension and release', 'Perfect-fifth power pair', 'Minor-sixth colour',
        'Major-sixth reach', 'Minor-seventh resolve', 'Major-seventh leading tone', 'Interval stack in C',
        'Ascending thirds', 'Descending fourths', 'Skip-string fifths', 'Two-octave arpeggio map',
        'Interval inversion flip', 'Chromatic neighbour cells', 'Triad shell intervals', 'Diatonic interval loop',
        'Modal character pair', 'Ear-to-hand interval relay'
      ],
      focus: [
        'Play a low-E note and its octave on string 4; sing the octave before checking it.',
        'Move C–D–E–F♯ on one string and keep each whole-step distance equal at 60 BPM.',
        'Use A on string 4 and C on string 3, then move the same minor-third relationship to D–F and E–G.',
        'Sing C to E, check the major third on string 5–3, and correct the pitch until the sung note settles.',
        'Play G on string 6 and C on string 5, then transfer the perfect fourth to every adjacent string pair.',
        'Alternate C–F♯ and C–F on two strings; hear the tritone resolve down by one fret to a perfect fourth.',
        'Build root–fifth pairs on strings 6–5, 5–4, 4–3, and 3–2 with identical attack and muting.',
        'Play A–F and D–B♭ as minor sixths, then resolve each to the nearest chord tone in the key of C.',
        'Reach C–A and G–E as major sixths without squeezing the fretting hand; keep the wrist neutral.',
        'Play B–A as a minor seventh and resolve B down to A over a two-beat C major drone.',
        'Lead from B to C over a C drone; leave a full beat of silence after the half-step resolution.',
        'Stack C–E–G–B as root, third, fifth, and seventh across two octaves, naming every interval.',
        'Sequence C–E, D–F, E–G, and F–A through one octave, accenting the lower note of each pair.',
        'Sequence G–D, F–C, E–B, and D–A downward while the picking hand keeps alternate strokes.',
        'Play fifths on strings 6–4 and 5–3, then skip to strings 4–2 without letting the middle string ring.',
        'Map C–E–G–C across two octaves using the nearest available string crossing at each step.',
        'Play a major third, invert it to a minor sixth, and state the inversion before repeating in D and G.',
        'Use a chromatic lower neighbour for every target note in a four-note C major phrase.',
        'Reduce a C, F, and G7 chord to root–third–seventh shells and name each interval as it sounds.',
        'Run the C-major scale in diatonic thirds, then reverse the order without losing the pulse.',
        'Compare the natural sixth in Dorian with the flat sixth in Aeolian over an A minor pedal.',
        'Hear a short two-note interval, sing it, find it in two neck locations, and record the answer in one pass.'
      ]
    },
    {
      id: 'scales', name: 'Scales & fretboard connections', short: 'Scales', icon: '⌁', summary: 'Connect patterns into lines that travel, sequence, and transpose cleanly.',
      modules: [
        { id: 'sc-major', name: 'Major-scale architecture', phase: '3', summary: 'Learn degrees, positions, and connected major-scale fragments.' },
        { id: 'sc-penta', name: 'Pentatonic vocabulary', phase: '3', summary: 'Build major, minor, and blues phrases from reliable shapes.' },
        { id: 'sc-caged', name: 'CAGED connections', phase: '3', summary: 'Link chord shapes, scale tones, and horizontal movement.' },
        { id: 'sc-lead', name: 'Scale lines in context', phase: '7', summary: 'Sequence and transpose scales into musical phrases.' }
      ],
      titles: [
        'C major, two strings at a time', 'G major position-one map', 'D major with F♯ and C♯', 'A major three-note cells',
        'E major across one octave', 'A minor pentatonic anchor tones', 'E minor pentatonic position link', 'Major/minor pentatonic mirror',
        'Blues-scale b5 insertion', 'Pentatonic diagonal shift', 'CAGED C-shape connection', 'CAGED A-shape connection',
        'CAGED E-shape connection', 'Three-notes-per-string G major', 'Three-string scale fragment', 'Horizontal A minor line',
        'Intervallic fourths in G', 'Six-note sequence in D', 'Four-note burst in E minor', 'Scale-degree landing drill',
        'Transpose the motif to B', 'Full-neck pentatonic relay'
      ],
      focus: [
        'Play C major on strings 6 and 5 only, degrees 1–7, then descend while naming each degree.',
        'Map G major at frets 2–5 and mark the B and F♯ notes before playing the pattern twice.',
        'Use D major from frets 2–7 and stop on F♯ and C♯ at the end of every bar.',
        'Play A major in three-note cells on strings 6–4; accent the first degree of each cell.',
        'Connect E major from open position to fret 4, keeping the open B and E strings muted between phrases.',
        'In A minor pentatonic, land on A or E on beat one of each two-beat cell.',
        'Link E minor pentatonic positions 1 and 2 at frets 12–15 with a slide on string 2.',
        'Play A major pentatonic and F♯ minor pentatonic over an A drone, comparing the same five pitch classes.',
        'Insert D♯ as the blue note between D and E in E blues; resolve it immediately to E or G.',
        'Move a four-note pentatonic fragment diagonally from string 6 fret 5 to string 1 fret 5 without stopping.',
        'Outline the C-shape of C major and fill each gap with the nearest scale degree.',
        'Outline the A-shape of D major at frets 5–7, then connect to the next A-shape at fret 9.',
        'Outline the E-shape of G major from fret 3 to fret 7 and call out the root locations.',
        'Run G major as three notes per string from string 6 fret 3 to string 1 fret 7, alternate picking throughout.',
        'Take degrees 1–2–3 on strings 4–3–2, shift up one position, and repeat for four cells.',
        'Play an A minor line from fret 5 to fret 17 using two notes per string and no box reset.',
        'Sequence G major in fourths: G–C, A–D, B–E, C–F♯, accenting each first note.',
        'Use a six-note 1–2–3–4–5–6 pattern in D major and reverse it without changing tempo.',
        'Play four-note bursts in E minor at 80 BPM, inserting one beat of rest after each burst.',
        'Over a C major loop, resolve every phrase to degree 1, 3, or 5 and label the landing note aloud.',
        'Transpose the opening C-major motif to B major by moving its root to string 5 fret 2 and preserving intervals.',
        'Start in A minor pentatonic position 1 and pass through positions 2, 3, 4, and 5 over a four-bar drone.'
      ]
    },
    {
      id: 'triads', name: 'Triads, inversions & voice leading', short: 'Triads', icon: '△', summary: 'See chord quality and movement in compact three-note shapes.',
      modules: [
        { id: 'tri-basics', name: 'Triad quality', phase: '4', summary: 'Build major, minor, diminished, augmented, and suspended triads.' },
        { id: 'tri-inversions', name: 'Three-string inversions', phase: '4', summary: 'Play root, first, and second inversion on every adjacent string set.' },
        { id: 'tri-diatonic', name: 'Diatonic triad maps', phase: '4', summary: 'Use Roman numerals and function in major and minor keys.' },
        { id: 'tri-lead', name: 'Triads as lead vocabulary', phase: '9', summary: 'Target chord tones and move through harmony with minimum motion.' }
      ],
      titles: [
        'Major triad: set 1–2–3', 'Minor triad: set 1–2–3', 'Diminished triad: set 2–3–4', 'Augmented triad: set 3–4–5',
        'Sus2 and sus4 colour swap', 'Root-position triads: set 4–5–6', 'First inversions: set 3–4–5', 'Second inversions: set 2–3–4',
        'All inversions of C', 'All inversions of G', 'Diatonic triads in C', 'Diatonic triads in A minor',
        'Roman-numeral call and response', 'Nearest inversion I–V–vi–IV', 'Voice-leading ii–V–I', 'Triad arpeggio in eighths',
        'Chord-tone landing on the third', 'CAGED triad sweep', 'Horizontal triad relay', 'Triad pair over a pedal',
        'Inversion melody on top string', 'Three-note reharmonization'
      ],
      focus: [
        'Play a C major triad on strings 1–2–3 in root position, then name root, third, and fifth.',
        'Play A minor on strings 1–2–3, compare its third to C major, and keep the top note ringing.',
        'Build B diminished on strings 2–3–4 with the third and fifth clearly separated in your voice.',
        'Play an augmented triad on strings 3–4–5, hear the raised fifth, and resolve it to the nearest major triad.',
        'Alternate Dsus2 and Dsus4 on strings 2–3–4, letting the suspended note move by one fret only.',
        'Play C, F, and G root-position triads on strings 4–5–6 with one finger movement between each chord.',
        'Move the third of C major into the bass on set 3–4–5 and keep the upper two notes unchanged when possible.',
        'Move the fifth of G major into the bass on set 2–3–4, then return to root position without a jump.',
        'Play C major root, first, and second inversion on the same three-string set; call the bass note each time.',
        'Play G major through all three inversions on set 4–5–6, stopping on the bass note for a full beat.',
        'Map I–ii–iii–IV–V–vi–vii° in C on one string set and label the quality before arpeggiating.',
        'Map i–ii°–III–iv–v–VI–VII in A natural minor and compare the raised third of V when harmonic minor is used.',
        'Have a partner call I, IV, or V; answer with the nearest inversion on set 2–3–4 within two beats.',
        'Connect C–G–Am–F using the closest inversion on set 1–2–3; keep the top voice within two frets.',
        'Play Dm7–G7–Cmaj7 as triad shells, moving each voice by the smallest available distance.',
        'Arpeggiate a C major triad in eighth notes across two octaves, accenting the root at the start of each bar.',
        'Over an Am loop, land on C on beat 1 and use A or E as the next target on beat 3.',
        'Find the same C major triad in the C, A, and E CAGED regions and connect them with one shared note.',
        'Move G, C, F, and Bb triads up the neck on the same string set, avoiding a wrap from fret 1 to fret 12.',
        'Alternate C major and A minor triads over a C pedal; keep the common C note ringing between shapes.',
        'Play a three-note melody on the highest string while the lower two strings hold the nearest inversion.',
        'Replace each chord in C–Am–F–G with a different inversion whose top note descends by step.'
      ]
    },
    {
      id: 'chords', name: 'Chords, voicings & harmonic progressions', short: 'Chords', icon: '▣', summary: 'Turn chord knowledge into playable shapes, progressions, and voice-leading choices.',
      modules: [
        { id: 'ch-open', name: 'Open and movable shapes', phase: '2', summary: 'Build dependable open, power, and barre chord mechanics.' },
        { id: 'ch-progressions', name: 'Progression vocabulary', phase: '4', summary: 'Hear function and memorize useful chord-degree routes.' },
        { id: 'ch-rhythm', name: 'Voicing under rhythm', phase: '5', summary: 'Keep chord changes stable while the groove changes.' },
        { id: 'ch-extensions', name: 'Extensions and guide tones', phase: '9', summary: 'Use sevenths, extensions, substitutions, and intentional colour.' }
      ],
      titles: [
        'Open-chord clean-change ladder', 'Power-chord root tracking', 'E-shape barre setup', 'A-shape barre setup',
        'C–G–Am–F pulse', 'I–V–vi–IV in four keys', '12-bar blues shell changes', 'ii–V–I shell voicings',
        'Dominant seventh colour', 'Major-seven versus minor-seven', 'Drop-2 Cmaj7 on strings 2–5', 'Drop-2 G7 guide tones',
        'Ninth-chord top-string movement', 'Eleventh-chord suspended colour', 'Thirteenth-chord shell economy', 'Secondary dominant chain',
        'Borrowed iv in a major key', 'Backdoor cadence', 'Voice-leading a pop progression', 'Chord substitution decision tree',
        'Reharmonize a four-bar loop', 'Transpose a complete chord chart'
      ],
      focus: [
        'Change Em–G–C–D at 60 BPM, four beats per chord, with every string checked for buzz.',
        'Play E5–G5–A5–B5 on strings 6–5, naming the root fret before each shift.',
        'Build an E-shape F barre at fret 1, then release pressure after each strum to test clean muting.',
        'Build an A-shape B♭ barre at fret 1, keeping the index finger curved enough for the first string.',
        'Play C–G–Am–F for eight bars using down-up eighths and no pause on the change.',
        'Move I–V–vi–IV through C, G, D, and A; write the four chord names before playing each key.',
        'Play a 12-bar blues in A with dominant seventh shells on beats 1 and 3, then add a turnaround in bar 12.',
        'Play Dm7–G7–Cmaj7 using only the top four strings, letting the guide tones move by one fret.',
        'Compare C7 and Cmaj7 over a C bass note; identify the Bb versus B before changing the chord.',
        'Alternate Cmaj7 and Cm7, listening specifically for the third that changes from E to Eb.',
        'Play Cmaj7 in drop-2 on strings 2–5, then move the shape to D and E without changing the voicing order.',
        'Reduce G7 to B–F guide tones, then add the root and fifth only when the pulse is stable.',
        'Play a C9 voicing and move the top D–E–F melody while the lower shell remains fixed.',
        'Use D11sus4 over a two-bar D pedal, resolving the suspended fourth to the third only on beat 4.',
        'Play A13 as a shell plus the top F♯, then remove one note each repetition until the function disappears.',
        'Chain A7–D7–G7–C7 by treating every chord as a temporary V of the next root.',
        'In C major, replace F with Fm for one bar; resolve Ab down to G in the next C chord.',
        'Play Fm7–Bb7–Cmaj7 as a backdoor cadence, keeping the top voice within one fret per change.',
        'Arrange C–Am–F–G with the smallest possible top-voice movement on strings 1–3.',
        'Given a static dominant chord, choose tritone substitution, relative minor, or sus colour and state why.',
        'Take C–G–Am–F and write a second version using one borrowed chord and one slash chord.',
        'Transpose a twelve-bar chord chart from A to E by naming every new root before playing the first bar.'
      ]
    },
    {
      id: 'rhythm', name: 'Rhythm, strumming & accompaniment', short: 'Rhythm', icon: '▤', summary: 'Make the pulse dependable, flexible, and musical under real chord changes.',
      modules: [
        { id: 'rh-pulse', name: 'Pulse and subdivision', phase: '1', summary: 'Quarter notes, eighths, rests, counting, and a steady internal clock.' },
        { id: 'rh-groove', name: 'Groove vocabulary', phase: '5', summary: 'Accents, syncopation, ghost notes, palm muting, and dynamics.' },
        { id: 'rh-feel', name: 'Meter and feel', phase: '5', summary: 'Straight, shuffle, triplet, six-eight, and displaced patterns.' },
        { id: 'rh-forms', name: 'Complete accompaniment', phase: '5', summary: 'Keep a rhythm part alive across sections and full song forms.' }
      ],
      titles: [
        'Quarter-note foot pulse', 'Eighth-note air strum', 'Rest-and-strum grid', 'Accent beat two and four',
        'Sixteenth-note muted engine', 'Offbeat reggae skank', 'Funk ghost-note pocket', 'Palm-muted eighths',
        'Straight versus shuffle pair', 'Triplet push and pull', 'Six-eight compound pulse', 'Dotted-eighth syncopation',
        'Three-beat waltz accompaniment', 'Five-beat accent cycle', 'Chord-change anticipation', 'Dynamic verse and chorus',
        'Ghost-note release control', 'One-chord groove builder', 'Two-bar turnaround pocket', 'Eight-bar form endurance',
        'Metronome on beats two and four', 'Full-song rhythm simulation'
      ],
      focus: [
        'Set 60 BPM and tap your foot on every quarter note while strumming one muted downstroke per click.',
        'Count 1-and-2-and-3-and-4-and aloud; play down-up air strums before adding one chord.',
        'Use a four-cell grid: strike on 1, rest on 2, strike on 3-and, rest on 4; keep the hand moving.',
        'Play a muted eighth-note pattern and accent only beats 2 and 4 for eight bars.',
        'Set 70 BPM and play sixteenth-note muted motion, opening the chord only on the written accents.',
        'Play a two-chord reggae pattern with a short upstroke on the offbeat and silence immediately after.',
        'Use a single A7 chord; add a left-hand ghost release on the e of 2 and the a of 4.',
        'Palm-mute low E eighths at 80 BPM, opening the final two hits of every four-beat bar.',
        'Play straight eighths for four bars, shuffle triplets for four bars, and keep the tempo unchanged.',
        'Count 1-trip-let-2-trip-let-3-trip-let-4-trip-let and accent the first and third triplet partials.',
        'Count 1-2-3-4-5-6 in 6/8, strumming on 1 and 4 while changing between C and G.',
        'Use a dotted-eighth plus sixteenth rhythm on Dm–Bb–C; place the chord change on the tied offbeat.',
        'Play C–F–G in 3/4, changing chord at the start of each bar and keeping the thumb pulse consistent.',
        'Accent beat 1 in a 5/4 bar, then rotate the accent to beat 4 without changing the subdivision.',
        'Anticipate the next chord on the final eighth of the bar for four repetitions, then remove the anticipation.',
        'Play a restrained verse pattern for eight bars and a two-level chorus pattern for eight bars without speeding up.',
        'Mute the strings with the fretting hand after every accented hit; listen for silence rather than noise.',
        'Build a groove over one E7 chord: pulse, accent, ghost note, open chord, then a one-beat rest.',
        'Create a two-bar turnaround using G7–F7–E7 and leave beat 4 empty before the loop restarts.',
        'Play an eight-bar accompaniment without stopping after a missed chord; use the next bar to recover.',
        'Set the metronome to 80 BPM and hear clicks only on beats 2 and 4; count the missing beats internally.',
        'Play verse, pre-chorus, chorus, and bridge patterns for 64 bars, marking the form with dynamics only.'
      ]
    },
    {
      id: 'picking', name: 'Picking, synchronization & dexterity', short: 'Picking', icon: '⇵', summary: 'Build efficient motion, reliable crossings, and speed that stays relaxed.',
      modules: [
        { id: 'pk-basics', name: 'Pick-hand mechanics', phase: '1', summary: 'Grip, depth, alternate strokes, and stable contact.' },
        { id: 'pk-crossings', name: 'String crossings', phase: '6', summary: 'Inside, outside, skip, and directional crossing control.' },
        { id: 'pk-sync', name: 'Fretting and picking sync', phase: '6', summary: 'Align both hands through shifts, bursts, and accents.' },
        { id: 'pk-speed', name: 'Speed and endurance', phase: '6', summary: 'Use measured bursts, rests, and tempo evidence.' }
      ],
      titles: [
        'One-string alternate engine', 'Two-string inside crossing', 'Two-string outside crossing', 'Three-string diagonal',
        'String-skip fifths', 'Accent every fourth note', 'Accent displacement by three', 'Directional change gate',
        'Chromatic four-finger ladder', '1-3-2-4 synchronization', 'Two-note-per-string burst', 'Three-note-per-string burst',
        'Sixteenth-note speed ladder', 'Burst-and-rest protocol', 'Metronome subdivision climb', 'Economy escape check',
        'Pick-depth reduction', 'Fretting-hand release test', 'Crossing endurance circuit', 'Tremolo to phrase transfer',
        'Tempo plateau audit', 'Four-minute relaxed run'
      ],
      focus: [
        'Play open string 1 with down-up strokes for two minutes; the pick should travel no deeper than the string height.',
        'Alternate on strings 2 and 1 using inside strokes at 70 BPM; mute the unused strings with both hands.',
        'Alternate on strings 1 and 2 using outside strokes; stop if the pick catches on the string edge.',
        'Play 1-2-3 notes on strings 6, 5, and 4, accenting the first note after every crossing.',
        'Pick fifths on strings 6 and 4 while the middle string stays silent; loop at 60 BPM.',
        'Play a sixteen-note chromatic cell and accent every fourth note without changing the stroke order.',
        'Accent groups of three inside a sixteenth-note stream; the accent must rotate against the click.',
        'At every string change, pause for one click and inspect the escape path before continuing.',
        'Play 1-2-3-4 on frets 5–8, then descend; keep each finger down until the next note sounds.',
        'Play 1-3-2-4 on strings 2 and 1, first at 60 BPM and then in 10 BPM steps.',
        'Use two notes per string across strings 6–1; start each string with the opposite stroke from the last.',
        'Use three notes per string in G major, keeping the fretting hand close to the fretboard during shifts.',
        'Play sixteenth notes at 60 BPM for one minute, then raise only 4 BPM if every note stays even.',
        'Play one beat fast, one beat silent, for eight cycles; use the silent beat to release both hands.',
        'Climb from quarter-note clicks to eighth, triplet, and sixteenth subdivisions while the fretting pattern stays fixed.',
        'Test an economy escape on a three-note-per-string phrase; record whether the pick exits after the final stroke.',
        'Reduce pick depth until the attack becomes quiet but still clear; compare 1 mm and 2 mm depth by ear.',
        'Play a four-fret pattern, release fretting pressure after each note, and listen for the string to go silent.',
        'Cycle inside crossing, outside crossing, and skip-string cells for 30 seconds each with 15 seconds rest.',
        'Tremolo-pick one sustained note for two beats, then turn it into a four-note melodic fragment.',
        'Find the highest tempo where four consecutive repetitions remain clean; write the number before moving on.',
        'Run the chosen six-note pattern for four minutes using 20 seconds play and 10 seconds release intervals.'
      ]
    },
    {
      id: 'expressive', name: 'Legato, bends, vibrato & expressive technique', short: 'Expression', icon: '≈', summary: 'Make pitch, touch, articulation, and silence communicate a musical idea.',
      modules: [
        { id: 'ex-legato', name: 'Hammer-ons and pull-offs', phase: '6', summary: 'Use minimum motion and even volume through legato cells.' },
        { id: 'ex-slides', name: 'Slides and position shifts', phase: '6', summary: 'Connect positions while preserving pitch and timing.' },
        { id: 'ex-bends', name: 'Bends and vibrato', phase: '6', summary: 'Hear target pitch before moving, then control the release.' },
        { id: 'ex-phrasing', name: 'Expression in lines', phase: '7', summary: 'Combine articulation choices into complete phrases.' }
      ],
      titles: [
        'Even hammer-on pairs', 'Pull-off volume match', 'Three-note legato cell', 'Legato across a string change',
        'Half-step bend target', 'Whole-step bend target', 'Pre-bend and release', 'Bend-and-vibrato hold',
        'Slow controlled vibrato', 'Wide-to-narrow vibrato', 'Slide into a chord tone', 'Slide out of a phrase',
        'Position shift with a guide finger', 'Silent shift checkpoint', 'Legato pentatonic connector', 'Blues curl articulation',
        'Bend release into a rest', 'Three-phrase dynamic arc', 'Articulation contrast study', 'Expressive call and response',
        'Target pitch recording test', 'Complete expressive etude'
      ],
      focus: [
        'Hammer 5h7 and 7h9 on string 1 with the pick striking only the first note of each pair.',
        'Pull 7p5 and 9p7 on string 2; match the picked note volume by using a smaller pull motion.',
        'Play 5h7p5h8 on string 1 for four beats, then rest for four beats and reset the hand.',
        'Play a 5h7p5 cell on string 2 and cross to string 1 without letting the open string ring.',
        'Bend string 2 fret 8 up a half step to C; check against fret 9 before every repetition.',
        'Bend string 2 fret 8 up a whole step to D; stop immediately if the target goes sharp.',
        'Pre-bend string 2 fret 10 to the pitch of fret 12, pick, and release slowly over two beats.',
        'Hold a whole-step bend for two beats, add four even vibrato pulses, and release on beat 4.',
        'Vibrate a sustained A at fret 10 with narrow, slow oscillations for four clicks.',
        'Start with a wide vibrato on fret 8, then narrow it over four bars without changing the pitch centre.',
        'Slide from fret 5 to 7 on string 3 and land on the third of an A minor chord on beat 1.',
        'End a phrase with a slide down from fret 10 to 7, then leave a full beat of silence.',
        'Shift from fret 5 to 7 with the first finger lightly touching the string as a guide, never gripping.',
        'Play a silent shift between frets 7 and 10; the click should pass while the string stays quiet.',
        'Connect A minor pentatonic positions 1 and 2 using one slide on string 2 and one pull-off on string 1.',
        'Bend the minor third toward the major third, stop halfway, and release to the root for a blues curl.',
        'Release a bend on beat 3 and mute on beat 4; the silence is part of the phrase.',
        'Play three four-bar phrases: quiet opening, strongest middle, soft ending, with no tempo change.',
        'Repeat one lick with a slide, a hammer-on, and a pick attack; describe the change in emotional weight.',
        'Record a target note, sing it back, bend into it, and compare the attack and release in playback.',
        'Choose a bend target, state its note name, and hit it cleanly five times in a row before adding vibrato.',
        'Perform a twelve-bar etude using one slide, one bend, one legato cell, one vibrato hold, and two rests.'
      ]
    },
    {
      id: 'lead', name: 'Lead guitar, phrasing & improvisation', short: 'Lead', icon: '✦', summary: 'Turn scales and harmony into phrases with direction, motif, and resolution.',
      modules: [
        { id: 'ld-language', name: 'Pentatonic phrasing', phase: '3', summary: 'Build short vocabulary that has rhythm, space, and a target.' },
        { id: 'ld-harmony', name: 'Chord-tone targeting', phase: '7', summary: 'Make the harmony audible through roots, thirds, and fifths.' },
        { id: 'ld-motifs', name: 'Motif development', phase: '7', summary: 'Repeat, vary, answer, and sequence a musical idea.' },
        { id: 'ld-modes', name: 'Modes in context', phase: '7', summary: 'Hear characteristic tones over useful harmonic settings.' }
      ],
      titles: [
        'Two-beat pentatonic answer', 'Space after the phrase', 'Call-and-response in A', 'Bend to the third',
        'Resolve to the root', 'Target the fifth on beat three', 'Triad-led lead line', 'I–IV–V landing map',
        'ii–V–I guide-tone line', 'Motif repeat unchanged', 'Motif with rhythmic shift', 'Motif sequence by step',
        'Question and answer register', 'Tension note release', 'Major versus minor colour', 'Dorian natural-sixth line',
        'Mixolydian flat-seventh line', 'Across-the-neck pentatonic', 'Melody before scale', 'Four-bar solo architecture',
        'Trade fours with a backing loop', 'Recorded improvisation review'
      ],
      focus: [
        'Over an A minor loop, play only two beats of A minor pentatonic and leave two beats empty.',
        'Play one phrase, then wait for the full next bar before answering; count the silence out loud.',
        'Improvise a two-bar call and a two-bar response in A, reusing one rhythm in both phrases.',
        'Over D7, bend F♯ toward G, then resolve to F♯ on beat 1 of the next bar.',
        'Over Am, make the final note of every phrase A; vary only the route and rhythm.',
        'Over a C–G loop, target D on beat 3 of each bar and resolve to the nearest chord tone.',
        'Arpeggiate a C major triad, then connect its notes with one passing scale tone per beat.',
        'Over A–D–E, land on A, D, and E roots at the start of their bars; use rests between targets.',
        'Over Dm7–G7–Cmaj7, target F, B, and E as the third or seventh of each chord.',
        'Play a two-bar motif four times without changing any note or rhythm; make the repetition intentional.',
        'Repeat a motif but move its final note from beat 4 to the and of 4 while keeping the bar intact.',
        'Sequence a four-note motif up one scale degree for four repetitions, then answer by reversing it.',
        'Play the question in frets 5–8 and the answer one octave higher without changing its rhythm.',
        'Use one chromatic tension note per bar and resolve it by step before the next chord change.',
        'Play A major pentatonic over A and A minor pentatonic over Am; compare the C♯ and C targets.',
        'Over Dm7, feature B natural as the sixth, then resolve it to A to make Dorian audible.',
        'Over G7, feature F as the flat seventh and resolve it down to E when C arrives.',
        'Start in A minor pentatonic position 1 and finish in position 5, crossing one position per bar.',
        'Sing a four-note melody, locate it, and only then add passing scale notes between the sung targets.',
        'Design a four-bar solo with opening statement, development, peak register, and a final root.',
        'Trade four bars with a backing loop: one bar must contain only rests and one must contain a bend.',
        'Record a one-minute solo, mark the strongest phrase and the least convincing phrase, then re-record only the weak one.'
      ]
    },
    {
      id: 'ear', name: 'Ear training, singing & transcription', short: 'Ear training', icon: '◉', summary: 'Build the inner ear that lets you predict, remember, and reproduce sound.',
      modules: [
        { id: 'ear-pitch', name: 'Pitch matching', phase: '1', summary: 'Match, sing, and locate single notes with a stable reference.' },
        { id: 'ear-intervals', name: 'Interval recognition', phase: '8', summary: 'Recognize distances and their emotional character.' },
        { id: 'ear-harmony', name: 'Chord and function hearing', phase: '8', summary: 'Hear roots, quality, bass movement, and harmonic function.' },
        { id: 'ear-transcribe', name: 'Transcription practice', phase: '8', summary: 'Reproduce rhythms, riffs, melodies, and articulation from recordings.' }
      ],
      titles: [
        'Match the open E', 'High versus low call', 'Sing the next note', 'Two-note memory echo',
        'Major/minor third hearing', 'Perfect-fourth hearing', 'Perfect-fifth hearing', 'Octave distance check',
        'Major/minor chord quality', 'Find the bass root', 'I versus IV function', 'V wants home',
        'Sing a five-note melody', 'Tap a remembered rhythm', 'Riff contour tracing', 'Melody without tablature',
        'Bend direction dictation', 'Articulation listening map', 'Four-bar chord transcription', 'Short solo transcription',
        'Internal-hearing pause', 'One-minute ear journal'
      ],
      focus: [
        'Play open low E, sing it for four seconds, and check that the sung note does not drift sharp.',
        'Have a partner play two notes; point up or down before touching the guitar, then verify the direction.',
        'Play C, imagine D, sing D, and check it; repeat with E, F, and G from the same C reference.',
        'Hear a two-note phrase, mute the guitar, wait four beats, and reproduce the exact order and rhythm.',
        'Compare C–E and C–Eb; sing both thirds over a C drone and label major or minor before checking.',
        'Hear C–F, sing the fourth, and locate it on strings 5–4 in two positions.',
        'Hear C–G, sing the fifth, and find it on strings 6–4 and 5–3 without looking at a chart.',
        'Play C and the higher C, then sing the octave from memory before testing the fretted note.',
        'Listen to two anonymous chords, call major or minor, and name the note that made the quality change.',
        'Mute the guitar while a C–F–G progression plays; point to the bass root before each change.',
        'Compare C and F over a C drone; describe which chord feels settled and why.',
        'Play G7 then C, sing the pull of F and B toward E and C, and resolve without rushing.',
        'Sing C–D–E–G–E, locate the melody on strings 2 and 1, and play it without tab.',
        'Listen to a two-bar rhythm, tap it on your leg, then write the counts before playing muted strings.',
        'Trace whether a recorded riff rises, falls, or repeats at each note before finding exact frets.',
        'Learn an eight-note melody by singing it three times, then locate it with no visual reference.',
        'Hear a bend and state whether it rises a half step or a whole step before testing the target fret.',
        'Mark every slide, hammer, pull, bend, and rest in a four-bar phrase before learning the pitches.',
        'Transcribe the roots and chord quality of a four-bar loop, then check with the instrument.',
        'Transcribe a two-bar solo one beat at a time; keep the rhythm exact before adding articulation.',
        'Pause the backing track before a cadence, imagine the resolution note, then play only after two silent beats.',
        'Write one sentence after each listening session: the clearest sound, the uncertain sound, and the next test.'
      ]
    },
    {
      id: 'theory', name: 'Music theory applied to the instrument', short: 'Applied theory', icon: '∑', summary: 'Use names, numbers, and functions to make practical choices on the neck.',
      modules: [
        { id: 'th-language', name: 'Key and interval language', phase: '2', summary: 'Translate note names, scale degrees, and interval spellings.' },
        { id: 'th-harmony', name: 'Functional harmony', phase: '4', summary: 'Analyze tonic, predominant, dominant, and common progressions.' },
        { id: 'th-advanced', name: 'Modes and chord-scale choices', phase: '9', summary: 'Connect modes, harmonic minor, and extensions to actual chords.' },
        { id: 'th-apply', name: 'Analysis into action', phase: '10', summary: 'Use theory to transpose, arrange, and make musical decisions.' }
      ],
      titles: [
        'Spell the major scale', 'Scale-degree number callout', 'Whole-step/half-step audit', 'Enharmonic function check',
        'Build diatonic triads', 'Roman numerals in C', 'Tonic and dominant hearing', 'Predominant route to V',
        'Secondary dominant V/V', 'Borrowed chord analysis', 'Dorian chord-scale map', 'Mixolydian dominant map',
        'Harmonic-minor leading tone', 'Melodic-minor colour note', 'Guide-tone analysis', 'Chord-scale decision card',
        'Transpose a melody by degree', 'Reharmonize one cadence', 'Analyze a recorded verse', 'Write a harmonic roadmap',
        'Compare two voicing choices', 'Theory-to-fretboard oral exam'
      ],
      focus: [
        'Spell C, G, D, and A major with correct sharps, then locate the third and seventh on one string set.',
        'Play a C major scale and call each note as 1–7 before repeating with the numbers only.',
        'Mark the whole and half steps in C major: W–W–H–W–W–W–H, then verify on one string.',
        'Spell F♯ as the third of D and G♭ as the fourth of D; explain why the letters differ.',
        'Build the seven triads of G major by stacking every other scale degree and label quality.',
        'Analyze C–Am–F–G as I–vi–IV–V, then play the progression in two positions.',
        'Over a C drone, compare I and V and write one sentence about the difference in stability.',
        'Play ii–V–I in C; state the predominant, dominant, and tonic function at each change.',
        'Insert A7 before Dm in C major and identify the temporary tonicization as V/ii.',
        'Replace F with Fm in C; write the borrowed scale degree and hear its chromatic voice leading.',
        'Over Dm7, emphasize B natural and compare it with B♭ to hear Dorian versus Aeolian.',
        'Over G7, use F as the flat seventh and B as the third; avoid treating the chord as a generic major scale.',
        'Raise G to G♯ in A minor for the V chord, then resolve the leading tone to A.',
        'Over Am, compare F♯ and F natural as colour choices and describe the change in tension.',
        'Reduce Dm7–G7–Cmaj7 to F–C, B–F, and E–B guide-tone pairs; track each by fret number.',
        'Choose a scale for Cmaj7, Dm7, G7, and A7 from the chord quality, then justify each characteristic degree.',
        'Transpose a C–D–E–G melody to E by preserving degrees 1–2–3–5 rather than copying frets.',
        'Reharmonize a G–C cadence with G7, Gsus4, or Db7 and write which voice supplies the resolution.',
        'Analyze the verse of a familiar recording: key, meter, tonic arrival, and one borrowed colour.',
        'Write a roadmap for an eight-bar loop with Roman numerals, bass movement, and a planned cadence.',
        'Play one progression with close voicings and one with open voicings; compare sustain, register, and motion.',
        'Explain a selected phrase using note names, degrees, intervals, and chord function while playing it.'
      ]
    },
    {
      id: 'songwriting', name: 'Song analysis, composition & arrangement', short: 'Composition', icon: '✎', summary: 'Turn isolated skills into parts, forms, recordings, and finished musical ideas.',
      modules: [
        { id: 'sw-riffs', name: 'Riffs and motifs', phase: '5', summary: 'Generate repeatable ideas with rhythm, contour, and a clear hook.' },
        { id: 'sw-forms', name: 'Song forms and development', phase: '10', summary: 'Build sections, contrast, transitions, and satisfying endings.' },
        { id: 'sw-arrange', name: 'Arrangement and recording', phase: '10', summary: 'Assign roles, create space, and review a recorded performance.' },
        { id: 'sw-advanced', name: 'Continuing creative studies', phase: 'advanced', summary: 'Explore genre vocabulary, hybrid parts, and personal voice.' }
      ],
      titles: [
        'Three-note riff seed', 'Rhythmic motif notebook', 'Question-and-answer hook', 'Riff with a pedal tone',
        'Progression with a destination', 'Verse/chorus contrast', 'Pre-chorus lift', 'Bridge with a new register',
        'Turnaround and ending', 'Melody over a loop', 'Counter-line on top strings', 'Two-guitar role split',
        'Intro texture study', 'Dynamic arrangement map', 'Record and annotate one take', 'Transpose the original',
        'Modal mood sketch', 'Genre vocabulary transplant', 'Fingerstyle/hybrid texture', 'Reharmonized chorus',
        'Complete sixteen-bar composition', 'Personal voice review'
      ],
      focus: [
        'Write a three-note riff in E minor using one repeated rhythm and one deliberate rest; record four loops.',
        'Write four rhythmic cells in a notebook using counts, then choose one and assign it to a single chord.',
        'Compose a two-bar question ending on degree 2 and a two-bar answer ending on degree 1.',
        'Hold open A as a pedal while moving D, F, and G shapes above it; choose the most convincing colour.',
        'Write C–Am–F–G, then alter the final chord so the loop clearly points back to C.',
        'Make an eight-bar verse sparse and an eight-bar chorus dense using the same harmonic loop.',
        'Add a two-bar pre-chorus that rises in register and lands on the dominant before the chorus.',
        'Write a bridge one octave above the verse and change one chord quality to create distance.',
        'Compose a two-bar turnaround and a final ending; the ending must slow only in its last bar.',
        'Sing a four-note melody over a C–G–Am–F loop, then locate it and preserve its rhythm.',
        'Keep a low chord shell and write a top-string counter-line that moves mostly by step.',
        'Arrange one part for low-register rhythm and one for high-register answers; remove clashes before recording.',
        'Create an intro using one repeated texture, then add the first full chord only at the final bar.',
        'Draw energy levels from 1–5 for verse, pre-chorus, chorus, bridge, and ending; match technique to each level.',
        'Record one complete take, mark two moments of tension and one moment of clarity, and write the next edit.',
        'Transpose the piece from E minor to G minor by naming the new roots and checking the melody’s range.',
        'Write an eight-bar Dorian sketch that features the natural sixth at least three times and resolves to the tonic.',
        'Borrow one rhythmic or harmonic idea from a chosen genre, then document exactly what changed in your own loop.',
        'Add a fingerstyle or hybrid-picked layer that fills only the rests in the rhythm-guitar part.',
        'Reharmonize the chorus with one borrowed chord and one secondary dominant while retaining the melody.',
        'Finish a sixteen-bar piece with intro, two sections, transition, and ending; export a recording and chart.',
        'Review three recordings and identify the repeated choices that sound most like your own musical voice.'
      ]
    }
  ];

  const tuning = [40, 45, 50, 55, 59, 64];
  const noteNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
  const intervalNames = { 0: 'R', 1: '♭2', 2: '2', 3: '♭3', 4: '3', 5: '4', 6: '♭5', 7: '5', 8: '♭6', 9: '6', 10: '♭7', 11: '7' };
  const scaleSets = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    pentatonic: [0, 3, 5, 7, 10],
    blues: [0, 3, 5, 6, 7, 10]
  };
  const chordQualities = [
    { name: 'major', intervals: [0, 4, 7] },
    { name: 'minor', intervals: [0, 3, 7] },
    { name: 'diminished', intervals: [0, 3, 6] },
    { name: 'augmented', intervals: [0, 4, 8] }
  ];

  function noteName(string, fret) { return noteNames[(tuning[string - 1] + fret) % 12]; }
  function nearestFret(string, pitchClass, startFret) {
    for (let fret = Math.max(0, startFret); fret <= 20; fret += 1) {
      if ((tuning[string - 1] + fret) % 12 === pitchClass) return fret;
    }
    return 0;
  }
  function fretboardVisual(rootPc, intervals, options) {
    const start = options && Number.isFinite(options.start) ? options.start : 2;
    const strings = options && options.strings ? options.strings : [6, 5, 4, 3, 2, 1];
    const notes = [];
    strings.forEach((string, index) => {
      const degree = intervals[index % intervals.length];
      const fret = nearestFret(string, (rootPc + degree) % 12, start);
      notes.push({ string, fret, label: options && options.labels ? options.labels[index % options.labels.length] : intervalNames[degree], note: noteName(string, fret), role: index === 0 ? 'root' : 'tone' });
    });
    return { type: 'fretboard', startFret: Math.max(0, start - 1), endFret: Math.min(20, start + 5), notes };
  }
  function triadVisual(i) {
    const sets = [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]];
    const set = sets[i % sets.length];
    const quality = chordQualities[i % chordQualities.length];
    const inversion = i % 3;
    const roles = inversion === 0 ? [0, 4, 7] : inversion === 1 ? [4, 7, 0] : [7, 0, 4];
    const root = [0, 7, 2, 9, 4, 5][i % 6];
    const notes = set.map((string, index) => {
      const interval = roles[index] === 0 ? 0 : roles[index] === 4 ? quality.intervals[1] : quality.intervals[2];
      const fret = nearestFret(string, (root + interval) % 12, 2 + (i % 5));
      return { string, fret, label: roles[index] === 0 ? 'R' : roles[index] === 4 ? '3' : '5', note: noteName(string, fret), role: roles[index] === 0 ? 'root' : 'tone' };
    });
    return { type: 'fretboard', startFret: Math.max(0, Math.min(...notes.map((n) => n.fret)) - 1), endFret: Math.min(20, Math.max(...notes.map((n) => n.fret)) + 1), notes, caption: quality.name + ' · ' + ['root', 'first', 'second'][inversion] + ' inversion · strings ' + set.join('–') };
  }
  function tabVisual(i, family) {
    const root = ['E', 'A', 'D', 'G'][i % 4];
    const fret = 2 + (i % 9);
    const patterns = {
      rhythm: ['0---0---|0---0---|', '0-0-0-0-|0-0-0-0-|', 'x-x-0-x-|x-x-0-x-|', '0--0-0--|0--0-0--|'],
      picking: ['5-6-7-8-|8-7-6-5-|', '5-7-6-8-|8-6-7-5-|', '5-6-5-7-|6-8-7-8-|', '5-7-9-7-|5-7-9-7-|'],
      expressive: ['5h7p5---|7/9---7-|', '8b(9)---|9r8---5-|', '5/7---7p5|3---(5)-|', '10b12~~-|10---8--|'],
      lead: ['5-7-8---|8-7-5---|', '5---7-8-|7---5---|', '8-7-5---|5/7-5---|', '5-7-5---|3---5---|'],
      ear: ['x---x---|x---x---|', '0---2---|4---2---|', '5---7---|8---7---|', '0-0---0-|0---0---|'],
      theory: ['0---2-4-|5---4-2-|', '5---7---|9---7---|', '0-2-4-5-|7-9-11--|', '5---4-2-|0---2-4-|'],
      songwriting: ['0---0-2-|3---2-0-|', '5---5---|3---2---|', '0-0---3-|2---0---|', '7---5---|3---2---|']
    };
    const body = (patterns[family] || patterns.lead)[i % 4].replace(/5/g, String(fret));
    return { type: 'tab', lines: ['e|--' + body + '--|', 'B|--' + body + '--|', 'G|--' + body + '--|', 'D|--' + body + '--|', 'A|--' + (root === 'A' ? '0' : fret) + '--------|', 'E|--' + (root === 'E' ? '0' : fret) + '--------|'] };
  }
  function rhythmVisual(i) {
    const cells = ['1 & 2 & 3 & 4 &', '1 e & a 2 e & a', '1 trip let 2 trip let', '1 . . 2 . . 3 . .'];
    return { type: 'rhythm', count: cells[i % cells.length], accents: [0, 3, 6].map((n) => (n + i) % 8), pattern: ['↓  ·  ↓  ·  ↑  ·  ↓  ·', '↓ ↑ · ↑  ↓ · ↑ ·', '↓ · ↑  ↓ · ↑  ↓ ·', '↓ · ·  ↑ · ·  ↓ ·'][i % 4] };
  }
  function visualFor(dept, i) {
    if (dept.id === 'fretboard') return fretboardVisual([4, 9, 2, 7, 11, 5][i % 6], [0, 2, 4, 5, 7, 9, 11], { start: i % 8, labels: ['R', '2', '3', '4', '5', '6', '7'] });
    if (dept.id === 'intervals') return fretboardVisual([0, 2, 4, 5, 7, 9][i % 6], [0, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11][i % 10]], { start: 2 + (i % 6), labels: ['R', intervalNames[[2, 3, 4, 5, 6, 7, 8, 9, 10, 11][i % 10]]] });
    if (dept.id === 'scales') return fretboardVisual([0, 7, 2, 9, 4, 5][i % 6], i % 4 === 0 ? scaleSets.major : i % 4 === 1 ? scaleSets.pentatonic : i % 4 === 2 ? scaleSets.blues : scaleSets.minor, { start: 2 + (i % 7), labels: ['R', '2', '3', '4', '5', '6', '7'] });
    if (dept.id === 'triads') return triadVisual(i);
    if (dept.id === 'rhythm') return rhythmVisual(i);
    return tabVisual(i, dept.id);
  }
  function moduleFor(dept, i) { return dept.modules[i % dept.modules.length]; }
  function difficultyFor(i) { return Math.min(5, 1 + Math.floor(i / 5)); }
  function levelName(level) { return ['Foundations', 'Developing', 'Intermediate', 'Advanced', 'Mastery'][level - 1]; }

  const exercises = [];
  let nextId = 1;
  departments.forEach((dept) => {
    dept.titles.forEach((title, i) => {
      const module = moduleFor(dept, i);
      const level = difficultyFor(i);
      const previous = i ? dept.short + ' · ' + dept.titles[i - 1] : 'Relaxed setup and a steady eighth-note pulse';
      const next = i < dept.titles.length - 1 ? dept.short + ' · ' + dept.titles[i + 1] : dept.short + ' review circuit';
      const start = 48 + (i % 6) * 8;
      const target = start + 32 + (level * 4);
      const duration = 6 + ((i + level) % 5) * 2;
      const material = dept.focus[i];
      const id = 'GML-' + String(nextId).padStart(3, '0');
      exercises.push({
        id,
        number: nextId,
        title,
        department: dept.id,
        departmentLabel: dept.name,
        module: module.id,
        moduleLabel: module.name,
        phase: module.phase,
        difficulty: level,
        difficultyLabel: levelName(level),
        objective: material,
        prerequisites: [previous],
        setup: dept.id === 'ear' ? 'Guitar, a quiet room, a single reference pitch, and a phone recorder.' : dept.id === 'rhythm' ? 'Guitar, metronome, foot pulse, and a way to count subdivisions aloud.' : 'Guitar in standard tuning, a metronome, and a clear practice surface.',
        instructions: [
          'Set the metronome to ' + start + ' BPM and make one relaxed pass without chasing speed.',
          material,
          'Complete ' + (3 + (i % 3)) + ' clean repetitions, then stop for one breath and check the specific listening cue below.',
          'Raise the tempo by ' + (4 + (i % 3)) + ' BPM only after the mastery checks are true; return to ' + start + ' BPM after any miss.',
          'Finish with one recorded pass at ' + Math.min(target, start + 16) + ' BPM so the next session has evidence to compare.'
        ],
        playable: dept.id === 'fretboard' ? 'Standard tuning · reference route: ' + noteName(6, i % 12) + ' on string 6, fret ' + (i % 12) + '.' : dept.id === 'triads' ? 'Keep the assigned three-string set isolated; let no adjacent string ring.' : dept.id === 'rhythm' ? 'Count the written subdivision aloud before adding a full chord.' : 'Use the displayed ' + dept.short.toLowerCase() + ' pattern as the first loop, then continue for the full practice duration.',
        content: material,
        tempo: { start, target, increment: 4 + (i % 3) },
        durationMinutes: duration,
        repetitions: (3 + (i % 3)) + ' clean passes, then one recorded check',
        variations: [
          'Move the same cell to ' + ['G', 'D', 'A', 'E'][i % 4] + ' while keeping the interval or rhythmic relationship unchanged.',
          'Remove the visual reference for the final two repetitions and name the target before playing it.',
          'Use one bar of silence after each repetition and restart on the exact written count.'
        ],
        commonMistakes: [
          'Starting faster than the hands can stay synchronized; lower the click and rebuild the first repetition.',
          'Allowing an open or adjacent string to ring; release fretting pressure and add a light picking-hand mute.',
          'Losing the count during a shift; speak the subdivision and land on the next downbeat rather than rushing.'
        ],
        listeningPoints: [
          'Every attack should have a clear front edge and a controlled decay.',
          'The target note, chord tone, or accent should be easy to hear without extra volume.',
          'The hands should feel smaller and quieter as the repetition becomes more accurate.'
        ],
        mastery: [
          'Complete four consecutive passes at ' + Math.min(target, start + 16) + ' BPM with no timing reset.',
          'Name the note, interval, degree, chord function, or rhythmic subdivision before the final pass.',
          'Record a clean take and identify one specific next adjustment in your notes.'
        ],
        related: { previous, next },
        visual: visualFor(dept, i),
        tags: [dept.short, module.name, levelName(level), 'Phase ' + (module.phase === 'advanced' ? 'Advanced' : module.phase)]
      });
      nextId += 1;
    });
  });

  const modules = departments.flatMap((dept) => dept.modules.map((module) => ({ ...module, department: dept.id, departmentLabel: dept.name })));
  const phaseCounts = phaseData.reduce((acc, phase) => { acc[phase.key] = exercises.filter((exercise) => exercise.phase === phase.key).length; return acc; }, {});
  const roadmap = phaseData.map((phase) => ({ ...phase, modules: modules.filter((module) => module.phase === phase.key).map((module) => ({ ...module, exerciseCount: exercises.filter((exercise) => exercise.module === module.id).length })) }));

  window.GML_DATA = {
    meta: { name: 'Guitar Mastery Lab', version: '1.0.0', exerciseCount: exercises.length, defaultKey: 'C major', tuning: 'E–A–D–G–B–E', phaseCounts },
    phases: phaseData,
    departments: departments.map(({ titles, focus, ...department }) => department),
    modules,
    roadmap,
    exercises
  };
})();
