<template>
  <canvas 
    ref="canvas" 
    id="graphicalKey" 
    width="250" 
    height="250" 
    style="border: 1px solid #d3d8de; border-radius: 4px; background-color: white; display: block; cursor: crosshair;"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseout="handleMouseOut"
  ></canvas>
</template>

<script>
export default {
  name: 'GraphicalKeyPad',
  props: {
    isDarkTheme: {
      type: Boolean,
      default: false
    }
  },
  emits: ['password-update'],
  data() {
    return {
      radius: 12,
      padding: 40,
      dots: [],
      lines: [],
      isDrawing: false,
      currentPath: [],
      currentPathSequence: [],
      ctx: null
    };
  },
  mounted() {
    this.initializeCanvas();
    this.drawDots();
  },
  watch: {
    isDarkTheme() {
      this.$nextTick(() => {
        this.drawDots();
      });
    }
  },
  methods: {
    initializeCanvas() {
      const canvas = this.$refs.canvas;
      this.ctx = canvas.getContext('2d');
      
      // Initialize dot positions
      this.dots = [];
      const cellSize = (canvas.width - 2 * this.padding) / 2;
      
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const x = this.padding + col * cellSize;
          const y = this.padding + row * cellSize;
          this.dots.push({x, y, row, col, num: row * 3 + col + 1});
        }
      }
    },
    
    drawDots() {
      const canvas = this.$refs.canvas;
      const ctx = this.ctx;
      
      // Determine theme colors
      const bgColor = this.isDarkTheme ? '#3a4a5a' : 'white';
      const dotColor = this.isDarkTheme ? '#537799' : '#4a76a8';
      const lineColor = this.isDarkTheme ? '#6489b9' : '#4a76a8';
      const borderColor = this.isDarkTheme ? '#405a70' : '#2c3e50';
      
      // Clear canvas with appropriate background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw lines
      ctx.lineWidth = 3;
      for (let i = 0; i < this.lines.length; i++) {
        const line = this.lines[i];
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = lineColor;
        ctx.stroke();
      }
      
      // Draw dots
      for (let i = 0; i < this.dots.length; i++) {
        const dot = this.dots[i];
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw number inside the dot
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(dot.num.toString(), dot.x, dot.y + 1);
      }
    },
    
    getClosestDot(x, y) {
      let closestDot = null;
      let minDist = Infinity;
      
      for (let i = 0; i < this.dots.length; i++) {
        const dot = this.dots[i];
        const dist = Math.sqrt(Math.pow(x - dot.x, 2) + Math.pow(y - dot.y, 2));
        
        if (dist < minDist && dist < this.radius * 2.5) {
          minDist = dist;
          closestDot = dot;
        }
      }
      
      return closestDot;
    },
    
    handleMouseDown(e) {
      const canvas = this.$refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dot = this.getClosestDot(x, y);
      if (dot) {
        this.isDrawing = true;
        this.currentPath = [dot];
        this.currentPathSequence = [dot.num];
        this.drawDots();
      }
    },
    
    handleMouseMove(e) {
      if (!this.isDrawing) return;
      
      const canvas = this.$refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dot = this.getClosestDot(x, y);
      
      if (dot && !this.currentPath.some(d => d.x === dot.x && d.y === dot.y)) {
        // Add this dot to the path if it's not already there
        const lastDot = this.currentPath[this.currentPath.length - 1];
        this.currentPath.push(dot);
        this.currentPathSequence.push(dot.num);
        
        // Add line from last dot to current dot
        this.lines.push({
          startX: lastDot.x,
          startY: lastDot.y,
          endX: dot.x,
          endY: dot.y
        });
      }
      
      this.drawDots();
      
      // Draw temporary line to current mouse position
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.moveTo(this.currentPath[this.currentPath.length - 1].x, this.currentPath[this.currentPath.length - 1].y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = this.isDarkTheme ? '#6489b9' : '#4a76a8';
      ctx.lineWidth = 3;
      ctx.stroke();
    },
    
    handleMouseUp(e) {
      if (!this.isDrawing) return;
      
      this.isDrawing = false;
      
      // Update the password field with the sequence
      if (this.currentPathSequence.length > 0) {
        this.$emit('password-update', this.currentPathSequence.join(''));
      }
      
      // Reset for next drawing
      this.currentPath = [];
      this.currentPathSequence = [];
      this.lines = []; // Clear the lines array
      
      // Redraw without the temporary line
      this.drawDots();
    },
    
    handleMouseOut(e) {
      if (!this.isDrawing) return;
      
      this.isDrawing = false;
      
      // Update the password field with the sequence
      if (this.currentPathSequence.length > 0) {
        this.$emit('password-update', this.currentPathSequence.join(''));
      }
      
      // Reset for next drawing
      this.currentPath = [];
      this.currentPathSequence = [];
      this.lines = []; // Clear the lines array
      
      // Redraw without the temporary line
      this.drawDots();
    }
  }
};
</script>

<style scoped>
#graphicalKey {
  border: 1px solid #d3d8de;
  border-radius: 4px;
  background-color: white;
  display: block;
  cursor: crosshair;
}
</style>