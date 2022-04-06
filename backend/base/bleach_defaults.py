BLEACH_ALLOWED_TAGS = [
    'a',
    'abbr',
    'acronym',
    'b',
    'blockquote',
    'code',
    'em',
    'i',
    'li',
    'ol',
    'strong',
    'ul',
    'p',
    'img',
    'br',
    'ul',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'u',
    's',
    'span',
    'table',
    'tr',
    'th',
    'td',
    'figure',
    'tbody',
    'thead'
]

BLEACH_ALLOWED_ATTRIBUTES = {
    'a': ['href', 'title', 'rel', 'target'],
    'abbr': ['title'],
    'acronym': ['title'],
    'img': ['src', 'alt', 'width', 'height'],
    '*': ['style', 'class', 'border'],

}

BLEACH_ALLOWED_STYLES = [
    'color', 'font-family', 'background-color', 'width', 'height', 'border-collapse'
]
