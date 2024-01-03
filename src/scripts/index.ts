
import { getLangFromUrl, useTranslations } from '@/i18n/utils'

const lang = getLangFromUrl(new URL(location.href))
const t = useTranslations(lang)


window.onload = () => {
    const languageBtn: any = document.getElementById('languageBtn')
    const languageMenu: any = document.getElementById('languageMenu')
    const lightMode: any = document.getElementById('lightMode')
    const lightModeText: any = document.getElementById('lightModeText')
    const darkIcon: any = document.getElementById('darkIcon')
    const lightIcon: any = document.getElementById('lightIcon')
    const morseMessage: any = document.getElementById('morseMessage')
    const morseCode: any = document.getElementById('morseCode')
    // const morseMessagePlayBtn: any = document.getElementById('morseMessagePlayBtn')
    const morseCodePlayBtn: any = document.getElementById('morseCodePlayBtn')
    const morseMessageCopyBtn: any = document.getElementById('morseMessageCopyBtn')
    const morseCodeCopyBtn: any = document.getElementById('morseCodeCopyBtn')
    const playIcon: any = document.getElementById('playIcon')
    const pauseIcon: any = document.getElementById('pauseIcon')
    const morseAudio: any = document.getElementById('morseAudio')
    const morse = window['morse-decoder']

    languageBtn.onclick = (event: any) => {
        event.stopPropagation()
        languageMenu?.classList.toggle('active')
    }
    lightMode.onclick = () => {
        if (lightMode?.classList.contains('dark')) {
            darkIcon?.classList.remove('hidden')
            lightIcon?.classList.add('hidden')
            lightModeText.innerText = t('mode.dark')
            document.documentElement.classList.remove('dark')
        } else {
            darkIcon?.classList.add('hidden')
            lightIcon?.classList.remove('hidden')
            lightModeText.innerText = t('mode.light')
            document.documentElement.classList.add('dark')
        }
        lightMode.classList.toggle('dark')
    }

    morseMessage.oninput = () => {
        const encoded = morse.encode(morseMessage.value) // ... --- ...
        morseCode.value = encoded
    }
    morseMessageCopyBtn.onclick = async () => {
        const text = morseMessage.value
        try {
            await navigator.clipboard.writeText(text)
            console.log('Content copied to clipboard：', text)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }
    morseCodeCopyBtn.onclick = async () => {
        const text = morseCode.value
        try {
            await navigator.clipboard.writeText(text)
            console.log('Content copied to clipboard：', text)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }
    morseCodePlayBtn.onclick = () => {
        if (morseMessage.value) {
            const morseDecodeAudio = morse.audio(morseMessage.value)
            morseDecodeAudio.getWaveUrl().then((url: string) => {
                morseAudio.src = url
                morseAudio.onended = () => {
                    console.info(111)
                    morseCodePlayBtn.classList.add('border')
                    morseCodePlayBtn.classList.remove('bg-blue-500')
                    playIcon.classList.remove('hidden')
                    pauseIcon.classList.add('hidden')
                }
                morseAudio.play()
                morseCodePlayBtn.classList.remove('border')
                morseCodePlayBtn.classList.add('bg-blue-500')
                playIcon.classList.add('hidden')
                pauseIcon.classList.remove('hidden')
            })
        } else {
            morseMessage.focus()
        }
    }

    // 点击下拉菜单意外区域隐藏
    window.onclick = function () {
        if (languageMenu?.classList.contains('active')) {
            languageMenu.classList.remove('active')
        }
    }
}