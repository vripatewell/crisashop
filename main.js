const audioFiles = [
      "audio1.mp3",
      "audio2.mp3",
      "audio3.mp3"
    ];

    const music = document.getElementById("paymentMusic");

    function playRandomMusic() {
      const randomIndex = Math.floor(Math.random() * audioFiles.length);
      music.src = audioFiles[randomIndex];
      music.play().catch((e) => {
        console.warn("Audio play gagal:", e);
      });
    }

    window.addEventListener("load", () => {
      const loader = document.getElementById("loader");
      const about = document.getElementById("about");

      setTimeout(() => {
        loader.classList.add("hidden");
        setTimeout(() => {
          about.classList.add("active");
        }, 200);
      }, 2500);
    });

    function showPayment() {
      const about = document.getElementById("about");
      const payment = document.getElementById("payment");

      // Hanya mainkan lagu baru kalau sebelumnya sudah selesai atau mati
      if (music.paused || music.ended) {
        playRandomMusic();
      }

      about.classList.remove("active");
      about.classList.add("hidden");
      setTimeout(() => {
        payment.classList.remove("hidden");
        payment.classList.add("active");
      }, 900);
    }

    function showAbout() {
      const payment = document.getElementById("payment");
      const about = document.getElementById("about");

      payment.classList.remove("active");
      payment.classList.add("hidden");
      setTimeout(() => {
        about.classList.remove("hidden");
        about.classList.add("active");
      }, 900);
    }

    function zoomQR() {
      const qrImage = document.getElementById("qrisImage").src;
      const overlay = document.getElementById("qrOverlay");
      document.getElementById("zoomedQR").src = qrImage;
      overlay.classList.add("active");
    }

    function closeZoom() {
      const overlay = document.getElementById("qrOverlay");
      overlay.classList.remove("active");
    }

    const teksList = [
      "Halo, selamat datang!",
      "website payment Crisa",
      "klik go to payment untuk",
      "memilih payment yang tersedia"
    ];

    let teksIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const speed = 100;
    const delayAfterComplete = 2000;
    const typingEl = document.getElementById("typing");

    function ketik() {
      const currentText = teksList[teksIndex];
      const visibleText = currentText.substring(0, charIndex);
      typingEl.textContent = visibleText;

      if (!isDeleting && charIndex < currentText.length) {
        charIndex++;
        setTimeout(ketik, speed);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(ketik, speed / 2);
      } else {
        if (!isDeleting) {
          isDeleting = true;
          setTimeout(ketik, delayAfterComplete);
        } else {
          isDeleting = false;
          teksIndex = (teksIndex + 1) % teksList.length;
          setTimeout(ketik, 300);
        }
      }
    }

    ketik();
    
    function copyToClipboard(elementId) {
      const text = document.getElementById(elementId).innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert("Nomor berhasil disalin!");
      }).catch(err => {
        console.error('Gagal menyalin: ', err);
      });
    }
