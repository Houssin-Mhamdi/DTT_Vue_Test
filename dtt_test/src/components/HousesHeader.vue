<script setup>
import addIcon from "@/assets/ic_plus_white@3x.png";
import addIcongray from "@/assets/ic_plus_grey@3x.png";

const emit = defineEmits(['create']);
</script>
<template>

         <header class="page-header">
        <h1>Houses</h1>

        <button class="create-btn desktop-only" @click="emit('create')">
          <img :src=addIcon alt="Create Icon" class="btn-icon"></img> CREATE NEW
        </button>
        
        <button class="create-btn-mobile mobile-only" @click="emit('create')">
            <img :src=addIcongray alt="Create Icon" class="btn-icon"></img>
        </button>
      </header>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
      margin-top: 30px;
}
.page-header > button.action-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.mobile-only {
  display: none; 
}


h1 {
  font-size: 1.8rem;
  font-weight: 700;
}
.create-btn {
  background-color:  var(--color-primary);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn-icon {
  width: 16px;
  height: 16px;
}


    @media (max-width: 767px) {
.page-header {
    justify-content: center; 
    position: relative; 
    margin-bottom: 20px;
  }

  
  .desktop-only {
    display: none; 
  }
  .mobile-only {
    display: block; 
  }

  h1 {
    font-size: 1.4rem; 
    text-align: center;
  }

  .create-btn-mobile {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 2.2rem; 
    color: #333;
    cursor: pointer;
  }


    }
</style>