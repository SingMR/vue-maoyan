import axios from 'axios'
function getAllCity() {
    axios.get('../../../static/json/city.json').then(res => {    
        // this.hotCity = res.data.data.slice(0, 11)
        var city = res.data.data
        var a = [],
          b = [],
          c = [],
          d = [],
          e = [],
          d = [],
          f = [],
          g = [],
          h = [],
          j = [],
          k = [],
          l = [],
          m = [],
          n = [],
          p = [],
          q = [],
          r = [],
          s = [],
          t = [],
          w = [],
          x = [],
          y = [],
          z = []
        var res = city.sort(this.compare('py'))
        res.filter(item => {
          switch (item.py[0]) {
            case 'a':
              a.push(item)
              this.city['A'] = a
              break
            case 'b':
              b.push(item)
              this.city['B'] = b
              break
            case 'c':
              c.push(item)
              this.city['C'] = c
              break
            case 'd':
              d.push(item)
              this.city['D'] = d
              break
            case 'e':
              e.push(item)
              this.city['E'] = e
              break
            case 'f':
              f.push(item)
              this.city['F'] = f
              break
            case 'g':
              g.push(item)
              this.city['G'] = g
              break
            case 'h':
              h.push(item)
              this.city['H'] = h
              break
            case 'j':
              j.push(item)
              this.city['J'] = j
              break
            case 'k':
              k.push(item)
              this.city['K'] = k
              break
            case 'l':
              l.push(item)
              this.city['L'] = l
              break
            case 'm':
              m.push(item)
              this.city['M'] = m
              break
            case 'n':
              n.push(item)
              this.city['N'] = n
              break
            case 'p':
              p.push(item)
              this.city['P'] = p
              break
            case 'q':
              q.push(item)
              this.city['Q'] = q
              break
            case 'r':
              r.push(item)
              this.city['R'] = r
              break
            case 's':
              s.push(item)
              this.city['S'] = s
              break
            case 't':
              t.push(item)
              this.city['T'] = t
              break
            case 'w':
              w.push(item)
              this.city['W'] = w
              break
            case 'x':
              x.push(item)
              this.city['X'] = x
              break
            case 'y':
              y.push(item)
              this.city['Y'] = y
              break
            case 'z':
              z.push(item)
              this.city['Z'] = z
              break
          }
        })      
      })    
}
 compare(property) {
    return function(a, b) {
      a = a[property][0].charCodeAt()
      b = b[property][0].charCodeAt()
      return a - b
    }
  }
export {
    getAllCity
}