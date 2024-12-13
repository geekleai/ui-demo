import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface Message {
  sender: "user" | "bot";
  content: string;
  isTyping?: boolean;
}

@Component({
  selector: "component-interactive-chatbot",
  templateUrl: "./chatbot.component.html",
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class InteractiveChatbotComponent implements OnInit {
  messages = signal<Message[]>([]);
  userInput = "";
  isOpen = signal(false);
  isThinking = signal(false);
  private readonly _cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.addInitialGreeting();
  }

  toggleChat(): void {
    this.isOpen.update(value => !value);
  }

  sendMessage(): void {
    if (this.userInput.trim() === "") {
      return;
    }

    this.addUserMessage(this.userInput);
    this.generateBotResponse(this.userInput);
    this.userInput = "";
  }

  private addInitialGreeting():void {
    const greeting = "Hello! I'm here to help you understand the project structure. What would you like to know?";
    this.messages.update(msgs => [...msgs, { sender: "bot", content: greeting }]);
  }

  private addUserMessage(content: string): void {
    this.messages.update(msgs => [...msgs, { sender: "user", content }]);
  }

  private addBotMessage(content: string): void {
    const newMessage: Message = { sender: "bot", content: "", isTyping: true };
    this.messages.update(msgs => [...msgs, newMessage]);
    this.isThinking.set(true);

    setTimeout(() => {
      this.isThinking.set(false);
      this.typeMessage(content, newMessage);
    }, 1000);
  }

  private typeMessage(content: string, message: Message): void {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < content.length) {
        message.content += content[index];
        index++;
        this._cdr.detectChanges();
      } else {
        clearInterval(intervalId);
        message.isTyping = false;
        this._cdr.detectChanges();
      }
    }, 50);
  }

  private generateBotResponse(userInput: string): void {
    const lowercaseInput = userInput.toLowerCase();
    let response = "";

    if (lowercaseInput.includes("folder structure")) {
      response =
        "The project follows a feature-based folder structure. Main folders include 'src/app/features' for feature modules, 'src/app/shared' for shared components and services, and 'src/app/core' for core functionality.";
    } else if (lowercaseInput.includes("component")) {
      response =
        "Components are organized within their respective feature folders. Each component typically has its own folder containing the .ts, .html, and .scss files.";
    } else if (lowercaseInput.includes("service")) {
      response =
        "Services are usually placed in a 'services' folder within each feature module. Global services are located in the 'src/app/core/services' directory.";
    } else if (lowercaseInput.includes("module")) {
      response =
        "The app is organized into feature modules, each representing a distinct functionality of the application. These modules are lazy-loaded for better performance.";
    } else {
      response =
        "I'm not sure about that specific aspect of the project structure. Could you ask about folder structure, components, services, or modules?";
    }

    this.addBotMessage(response);
  }
}
