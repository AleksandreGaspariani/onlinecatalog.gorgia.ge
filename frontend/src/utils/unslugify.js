function transliterateLatinToGeorgian(latinText) {
  const reverseMap = {
    'a': 'ა', 'b': 'ბ', 'g': 'გ', 'd': 'დ', 'e': 'ე',
    'v': 'ვ', 'z': 'ზ', 't': 'თ', 'i': 'ი', 'k': 'კ',
    'l': 'ლ', 'm': 'მ', 'n': 'ნ', 'o': 'ო', 'p': 'პ',
    'zh': 'ჟ', 'r': 'რ', 's': 'ს', 'u': 'უ', 'q': 'ქ',
    'gh': 'ღ', 'y': 'ყ', 'sh': 'შ', 'ch': 'ჭ', 'ts': 'ც',
    'dz': 'ძ', 'w': 'წ', 'kh': 'ხ', 'j': 'ჯ', 'h': 'ჰ'
  };

  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const digraphs = ['gh', 'sh', 'ch', 'ts', 'dz', 'zh', 'kh', 'w'];
  let result = '';
  let i = 0;



  while (i < latinText.length) {
    let matched = false;

    for (let digraph of digraphs) {
      if (latinText.substr(i, digraph.length) === digraph) {
        result += reverseMap[digraph];
        i += digraph.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const current = latinText[i];
      const prev = i > 0 ? latinText[i - 1] : '';

      if (current === 't') {
        result += vowels.includes(prev) ? 'თ' : 'ტ';
      } else {
        result += reverseMap[current] || current;
      }

      i++;
    }
  }

  return result;
}

export function unslugify(slug) {
  if (typeof slug !== 'string') return '';
  const noDashes = slug.replace(/-/g, ' ');
  return transliterateLatinToGeorgian(noDashes);
};


