const fs = require('fs')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)

  if (duplicateNote) {
    console.error('Note title taken!')
  } else {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log('New note added!')
  }
}

const removeNote = title => {
  const notes = loadNotes()
  const notesToKeep = notes.filter(note => note.title !== title)

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep)
    console.log('Note removed!')
  } else {
    console.error('No note found!')
  }
}

const listNotes = () => {
  const notes = loadNotes()

  console.log('Your notes:')

  notes.forEach(note => console.log(note.title))
}

const readNote = title => {
  const notes = loadNotes()
  const foundNote = notes.find(note => note.title === title)
  if (foundNote) {
    console.log('Title:', foundNote.title)
    console.log('Body: ', foundNote.body)
  } else {
    console.error('No note found!')
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (error) {
    console.error(error)
    return []
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
