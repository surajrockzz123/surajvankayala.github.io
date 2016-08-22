var hobnob = hobnob || {}
hobnob.radialProgress = function(element, radius) {
    var outline  = null
    var pie      = null
    var full     = null
    var diameter = radius * 2
    var circumference = Math.PI * diameter
    var max      = 0
    var self     = this

    this.getValue = function() {
        return parseFloat(element.getAttribute('value'))
    }

    this.setMax = function(max) {
        element.setAttribute('max', parseFloat(max))
        calcPie()
    }

    this.getMax = function() {
        return parseFloat(element.getAttribute('max'))
    }

    this.getPercent = function() {
        var percent = this.getValue() / this.getMax()
        if (percent > 1) percent = 1

        return (percent * 100)
    }

    var init = function() {
        var ns        = 'http://www.w3.org/2000/svg'
        var svg       = document.createElementNS(ns, 'svg')
        var transform = 'rotate(-90,'+radius+','+radius+')'
        outline       = document.createElementNS(ns, 'circle')
        pie           = document.createElementNS(ns, 'path')
        circle        = document.createElementNS(ns, 'circle')

        svg.setAttribute('version', '1.1')
        svg.setAttribute('xmlns', ns)
        svg.setAttribute('viewBox', '-10 -10 '+(diameter*1.25)+' '+(diameter*1.25))
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')

        circle.setAttributeNS(null, 'r', radius)
        circle.setAttributeNS(null, 'cx', radius)
        circle.setAttributeNS(null, 'cy', radius)
        circle.setAttributeNS(null, 'fill', '#999999')
        circle.setAttributeNS(null, 'stroke', '#111111')
        circle.setAttributeNS(null, 'stroke-width', '5')

        pie.setAttributeNS(null, 'transform', transform)
        pie.setAttributeNS(null, 'fill', '#00ff00')

        outline.setAttributeNS(null, 'r', radius)
        outline.setAttributeNS(null, 'cx', radius)
        outline.setAttributeNS(null, 'cy', radius)
        outline.setAttributeNS(null, 'transform', transform)
        outline.setAttributeNS(null, 'fill', 'transparent')
        outline.setAttributeNS(null, 'stroke-width', '6')
        outline.setAttributeNS(null, 'stroke', '#aaffaa')
        outline.setAttributeNS(null, 'stroke-dasharray', circumference+' '+circumference)
        outline.setAttributeNS(null, 'stroke-dashoffset', circumference)

        circle.setAttributeNS(null, 'class', 'radial-innerCircle')
        pie.setAttributeNS(null, 'class', 'radial-pieSegment')
        outline.setAttributeNS(null, 'class', 'radial-outerPath')

        element.parentNode.insertBefore(svg, element)
        svg.appendChild(circle)
        svg.appendChild(pie)
        svg.appendChild(outline)
        element.style['display'] = 'none'
        calcPie()
    }

    var calcPie = function() {
        var percent  = (self.getPercent() / 100)

        if (percent >= 1) percent = 0.99999

        var angle = 360 * percent
        var x1    = parseFloat(radius + (radius*Math.cos(Math.PI*0/180)))
        var y1    = parseFloat(radius + (radius*Math.sin(Math.PI*0/180)))
        var x2    = parseFloat(radius + (radius*Math.cos(Math.PI*angle/180)))
        var y2    = parseFloat(radius + (radius*Math.sin(Math.PI*angle/180)))

        var pieStr = 'M'+radius+','+radius+' L'+x1+','+y1+'  A'+radius+','+radius+' 0 '+(percent > 0.5 ? 1 : 0)+',1 '+x2+','+y2+' z';
        pie.setAttributeNS(null, 'd', pieStr)

        outline.setAttributeNS(null, 'stroke-dashoffset', circumference - (circumference * percent))
    }

    element != undefined && element.nodeType === 1 && init()

    this.setValue = function(val) {
        element.setAttribute('value', parseFloat(val))
        calcPie()
    }
}
