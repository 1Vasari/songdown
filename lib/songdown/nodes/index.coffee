'use strict'

marked = require 'marked'
_ = require 'lodash'

Tokens = require './../tokens'

# Base class for everything going on in here...
class Node
    constructor: (@section = 'ERROR!!!!') ->
    toHtml: -> throw new Error 'override me please!!!'

# Some simple methods
chords_line = (line) -> '<pre class="chords">' + line + '<br /></pre>'
lyrics_line = (line) -> '<pre class="lyrics">' + line + '<br /></pre>'
verse_block = (lines) -> '<div class="verse">' + lines.join("\n") + '</div>'


class VerseHeader extends Node
    toHtml: ->

        # Remove +'s and -'s from header.
        @section = @section.replace Tokens.VERSE_CHORDS_HEADER, Tokens.VERSE_START
        @section = @section.replace Tokens.VERSE_LYRICS_HEADER, Tokens.VERSE_START

        '<br /><span class="verse-head">' + @section + '</span><br />'


# This verse has chords and lyrics.
class VerseCommon extends Node
    toHtml: ->
        lines = _.map @section, (line, i) ->

            # Chords are on even numbered lines
            if i % 2 == 0
                chords_line line
            else
                lyrics_line line

        verse_block lines


class VerseChords extends Node
    toHtml: ->
        lines = _.map @section, chords_line
        verse_block lines


class VerseLyrics extends Node
    toHtml: ->
        lines = _.map @section, lyrics_line
        verse_block lines


class Markdown extends Node
    toHtml: ->
        marked @section


module.exports = {VerseHeader, VerseCommon, VerseChords, VerseLyrics, Markdown}
